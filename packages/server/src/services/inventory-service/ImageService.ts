import type {
  CreateImageRequest,
  CreateImageResponse,
  DeleteImageResponse,
  FindImagesRequest,
  Image,
  PatchImageResponse,
} from '@resala/shared';

import type { InventoryRepository } from '../../repositories/index.js';
import { BadRequestError, NotFoundError } from '../../utils/ApiErrors.js';
import type { FileService } from '../index.js';
import type StockService from './StockService.js';

export default class ImageService {
  constructor(
    private readonly imageRepository: InventoryRepository,
    private readonly stockService: StockService,
    private readonly fileService: FileService
  ) {}

  async findImageById(id: number) {
    const image = await this.imageRepository.image.findById(id);
    if (!image) {
      throw new NotFoundError('Image not found');
    }

    return image;
  }

  async createImages(
    image: CreateImageRequest['body'] & { files: Express.Multer.File[] }
  ): Promise<CreateImageResponse['message']> {
    await Promise.all([
      this._validateStock(image.productId, image.colorId),
      this._validateImagesLimit(image.productId, image.colorId, image.files.length),
    ]);

    const productImages = await this.imageRepository.image.listByProduct(image.productId);
    const colorHasPrimaryImage = productImages.some(
      img => img.colorId === image.colorId && img.isPrimary
    );

    // Upload image to cloud storage
    const uploadedImages = await this.fileService.uploadFiles(image.files);

    // Create image in database
    const images: Omit<Image, 'id'>[] = uploadedImages.map(({ url, key }, index) => ({
      productId: image.productId,
      colorId: image.colorId,
      imageUrl: url,
      imageKey: key,
      isPrimary: !colorHasPrimaryImage && index === 0,
      createdAt: new Date(),
    }));
    await this.imageRepository.image.createMany(images);

    return 'Images uploaded successfully';
  }

  async setImageAsPrimary(
    imageId: number,
    isPrimary: boolean = true
  ): Promise<PatchImageResponse['data']> {
    const image = await this.findImageById(imageId);
    if (image.isPrimary === isPrimary) {
      return image;
    }

    await this._validateStock(image.productId, image.colorId);

    const productImages = await this.imageRepository.image.listByProduct(image.productId);
    const images = productImages.filter(img => img.colorId === image.colorId);
    const ids = images.filter(img => img.id !== imageId).map(img => img.id);

    await Promise.all([
      this.imageRepository.image.updateMany(ids, { isPrimary: false }),
      this.imageRepository.image.update(imageId, { isPrimary: true }),
    ]);

    return { ...image, isPrimary };
  }

  async deleteImage(id: number): Promise<DeleteImageResponse['data']> {
    const image = await this.findImageById(id);

    await this.imageRepository.image.delete(id);

    // Delete image from cloud storage
    await this.fileService.deleteFile(image.imageKey);

    if (image.isPrimary) {
      const productImages = await this.imageRepository.image.listByProduct(image.productId);
      const images = productImages.filter(img => img.colorId === image.colorId);
      const newPrimaryImage = images[0];
      if (newPrimaryImage) {
        await this.imageRepository.image.update(newPrimaryImage.id, { isPrimary: true });
      }
    }

    return image;
  }

  async findImages({ colorId, productId }: FindImagesRequest['query']): Promise<Image[]> {
    return await this.imageRepository.image.listByProductAndColor(productId, colorId);
  }

  async _validateStock(productId: number, colorId: number) {
    const stocks = await this.stockService.getByProduct(productId);
    if (!stocks.some(stock => stock.color.id === colorId)) {
      throw new NotFoundError('Stock not found');
    }
  }

  async _validateImagesLimit(
    productId: number,
    colorId: number,
    filesLen: number,
    limit: number = 5
  ) {
    const existingImages = await this.imageRepository.image.listByProduct(productId);
    const existingImagesByColor = existingImages.filter(img => img.colorId === colorId);
    if (existingImagesByColor.length + filesLen > limit) {
      throw new BadRequestError(`Exceeded images limit of ${limit} per color`);
    }
  }
}
