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

  async createProduct(product: CreateProductRequest['body'] & { file: Express.Multer.File }) {
    await this.category.findCategoryById(product.categoryId);

    const exist = await this.findProductByName(product.enName, product.arName);
    if (exist) {
      throw new ConflictError('Product already exists');
    }

    const { key, url } = await this.fileService.uploadFile(product.file);

    return await this.inventoryRepo.product.create({
      categoryId: product.categoryId,
      arName: product.arName,
      enName: product.enName,
      arDescription: product.arDescription,
      enDescription: product.enDescription,
      price: product.price,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageKey: key,
      imageUrl: url,
    });
  }

  async updateProduct(
    id: number,
    data: UpdateProductRequest['body'] & { file?: Express.Multer.File }
  ) {
    const oldProduct = await this.findProductById(id);
    data.categoryId && (await this.category.findCategoryById(data.categoryId));

    const exist = await this.findProductByName(data.enName, data.arName);
    if (exist && exist.id !== id) {
      throw new ConflictError('Product already exists');
    }

    let product: Partial<Product> = {
      categoryId: data.categoryId || oldProduct.categoryId,
      arName: data.arName || oldProduct.arName,
      enName: data.enName || oldProduct.enName,
      arDescription: data.arDescription || oldProduct.arDescription,
      enDescription: data.enDescription || oldProduct.enDescription,
      price: data.price || oldProduct.price,
      updatedAt: new Date(),
    };

    if (data.file) {
      await this.fileService.deleteFile(oldProduct.imageKey);
      const { key, url } = await this.fileService.uploadFile(data.file);
      product = { ...product, imageKey: key, imageUrl: url };
    }

    return await this.inventoryRepo.product.update(id, product);
  }

  async deleteProduct(id: number) {
    const product = await this.findProductById(id);
    await this.fileService.deleteFile(product.imageKey);
    return await this.inventoryRepo.product.delete(id);
  }

  async findProductByName(enName: string, arName: string) {
    return (
      (await this.inventoryRepo.product.findByName(enName)) ||
      (await this.inventoryRepo.product.findByName(arName))
    );
  }
}
