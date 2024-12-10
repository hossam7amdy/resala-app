import { BadRequestError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
import type {
  CreateImageRequest,
  DeleteImageResponse,
  Image,
  ListImagesRequest,
  UpdateImageResponse,
} from '@resala/shared';

import type { FileStorage } from '../storage';

export class ImageService {
  constructor(
    private readonly db: DataStore,
    private readonly fileService: FileStorage
  ) {}

  async find(id: string) {
    return await this.db.image.findUniqueOrThrow({ where: { id } });
  }

  async createMany(image: CreateImageRequest['body'] & { files: File[] }): Promise<void> {
    await this.checkColorLimits(image.productId, image.colorId, image.files.length);

    const productImages = await this.list({ productId: image.productId });
    const colorHasPrimaryImage = productImages.some(
      img => img.colorId === image.colorId && img.isPrimary
    );

    // Upload image to cloud storage
    const uploadedImages = await this.fileService.uploadFiles(image.files);

    // Create image in database
    const images = uploadedImages.map(({ url, key }, index) => ({
      productId: image.productId,
      colorId: image.colorId,
      imageUrl: url,
      imageKey: key,
      isPrimary: !colorHasPrimaryImage && index === 0,
    }));

    await this.db.image.createMany({ data: images });
  }

  async update(id: string, data: Partial<Image>): Promise<Image> {
    return await this.db.image.update({ where: { id }, data });
  }

  async updatePrimary(id: string, isPrimary: boolean = true): Promise<UpdateImageResponse['data']> {
    const image = await this.find(id);

    if (image.isPrimary) {
      return image;
    }

    const productImages = await this.list({ productId: image.productId, colorId: image.colorId });
    const ids = productImages.filter(img => img.id !== id).map(img => img.id);

    await this.db.$transaction([
      this.db.image.update({ where: { id }, data: { isPrimary: true } }),
      this.db.image.updateMany({ where: { id: { in: ids } }, data: { isPrimary: false } }),
    ]);

    return { ...image, isPrimary };
  }

  async delete(id: string): Promise<DeleteImageResponse['data']> {
    const image = await this.find(id);

    // Delete image from cloud storage
    await this.fileService.deleteFile(image.imageKey);

    await this.db.image.delete({ where: { id } });

    if (image.isPrimary) {
      const [productImages] = await this.list({
        productId: image.productId,
        colorId: image.colorId,
      });

      if (productImages) {
        await this.update(productImages.id, { isPrimary: true });
      }
    }

    return image;
  }

  async list({ colorId, productId }: ListImagesRequest['query']): Promise<Image[]> {
    return await this.db.image.findMany({ where: { colorId, productId } });
  }

  private async checkColorLimits(
    productId: string,
    colorId: string,
    filesCount: number,
    limit: number = 5
  ) {
    const existingImages = await this.list({ productId, colorId });

    if (existingImages.length + filesCount > limit) {
      throw new BadRequestError(`Exceeded images limit of ${limit} per color`);
    }
  }
}
