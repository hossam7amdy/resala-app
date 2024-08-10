import type {
  CreateProductRequest,
  DefaultFilters,
  GetProductResponse,
  GetProductsListResponse,
  Product,
  UpdateProductRequest,
} from '@resala/shared';

import type { InventoryRepository } from '../../repositories/index.js';
import { ConflictError, NotFoundError } from '../../utils/ApiErrors.js';
import type FileService from '../file-service/FileService.js';
import type CategoryService from './CategoryService.js';

export default class ProductService {
  constructor(
    private readonly inventoryRepo: InventoryRepository,
    private readonly category: CategoryService,
    private readonly fileService: FileService
  ) {}

  async findProductById(id: number): Promise<GetProductResponse['data']> {
    const product = await this.inventoryRepo.product.findById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async listProductsPaginated(filters: DefaultFilters): Promise<GetProductsListResponse['data']> {
    const { total, products } = await this.inventoryRepo.product.list(filters);

    return {
      products,
      pagination: { page: filters.page, limit: filters.limit, total },
    };
  }

  async createProduct(payload: CreateProductRequest['body'] & { file: Express.Multer.File }) {
    await this.category.findCategoryById(payload.categoryId);

    const exist = await this.findProductByName(payload.enName, payload.arName);
    if (exist) {
      throw new ConflictError('Product already exists');
    }

    const { key, url } = await this.fileService.uploadFile(payload.file);

    const product: Omit<Product, 'id'> = {
      categoryId: payload.categoryId,
      arName: payload.arName,
      enName: payload.enName,
      arDescription: payload.arDescription,
      enDescription: payload.enDescription,
      price: payload.price,
      imageKey: key,
      imageUrl: url,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await this.inventoryRepo.product.create(product);
  }

  async updateProduct(
    id: number,
    payload: UpdateProductRequest['body'] & { file?: Express.Multer.File }
  ) {
    const oldProduct = await this.findProductById(id);
    payload.categoryId && (await this.category.findCategoryById(payload.categoryId));

    const exist = await this.findProductByName(payload.enName, payload.arName);
    if (exist && exist.id !== id) {
      throw new ConflictError('Product already exists');
    }

    let product: Partial<Product> = {
      categoryId: payload.categoryId || oldProduct.categoryId,
      arName: payload.arName || oldProduct.arName,
      enName: payload.enName || oldProduct.enName,
      arDescription: payload.arDescription || oldProduct.arDescription,
      enDescription: payload.enDescription || oldProduct.enDescription,
      price: payload.price || oldProduct.price,
      updatedAt: new Date(),
    };

    if (payload.file) {
      await this.fileService.deleteFile(oldProduct.imageKey);
      const { key, url } = await this.fileService.uploadFile(payload.file);
      product = { ...product, imageKey: key, imageUrl: url };
    }

    return await this.inventoryRepo.product.update(id, product);
  }

  async deleteProduct(id: number) {
    const [product, stockImages] = await Promise.all([
      this.findProductById(id),
      this._getProductStockImages(id),
    ]);

    await Promise.all([
      this.fileService.deleteFile(product.imageKey),
      stockImages.length && this.fileService.deleteFiles(stockImages.map(img => img.imageKey)),
    ]);

    return await this.inventoryRepo.product.delete(id);
  }

  async findProductByName(enName: string, arName: string) {
    return (
      (await this.inventoryRepo.product.findByName(enName)) ||
      (await this.inventoryRepo.product.findByName(arName))
    );
  }

  async _getProductStockImages(productId: number) {
    const stocks = await this.inventoryRepo.stock.findByProduct(productId);
    const stockImages = stocks.map(stock => stock.color.images);
    return stockImages.flat();
  }
}
