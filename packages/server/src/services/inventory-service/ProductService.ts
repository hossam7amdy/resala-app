import type {
  CreateProductRequest,
  DefaultFilters,
  GetProductResponse,
  GetProductsListResponse,
  UpdateProductRequest,
} from '@resala/shared';

import type { InventoryRepository } from '../../repositories/index.js';
import { ConflictError, NotFoundError } from '../../utils/ApiErrors.js';
import type CategoryService from './CategoryService.js';

export default class ProductService {
  constructor(
    private readonly inventoryRepo: InventoryRepository,
    private readonly category: CategoryService
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

  async createProduct(
    product: CreateProductRequest['body'] & { imageKey: string; imageUrl: string }
  ) {
    await this.category.findCategoryById(product.categoryId);

    const exist = await this.findProductByName(product.enName, product.arName);
    if (exist) {
      throw new ConflictError('Product already exists');
    }

    return await this.inventoryRepo.product.create({
      categoryId: product.categoryId,
      arName: product.arName,
      enName: product.enName,
      arDescription: product.arDescription,
      enDescription: product.enDescription,
      price: product.price,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageKey: product.imageKey,
      imageUrl: product.imageUrl,
    });
  }

  async updateProduct(id: number, product: UpdateProductRequest['body']) {
    await this.findProductById(id);
    await this.category.findCategoryById(product.categoryId);

    const exist = await this.findProductByName(product.enName || '', product.arName || '');
    if (exist && exist.id !== id) {
      throw new ConflictError('Product already exists');
    }

    return await this.inventoryRepo.product.update(id, {
      categoryId: product.categoryId,
      arName: product.arName,
      enName: product.enName,
      arDescription: product.arDescription,
      enDescription: product.enDescription,
      price: product.price,
    });
  }

  async deleteProduct(id: number) {
    await this.findProductById(id);

    return await this.inventoryRepo.product.delete(id);
  }

  async findProductByName(enName: string, arName: string) {
    return (
      (await this.inventoryRepo.product.findByName(enName)) ||
      this.inventoryRepo.product.findByName(arName)
    );
  }
}
