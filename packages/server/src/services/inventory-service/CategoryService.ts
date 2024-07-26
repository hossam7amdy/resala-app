import type {
  CreateCategoryRequest,
  GetCategoryProductsResponse,
  GetCategoryResponse,
  ListCategoriesResponse,
  UpdateCategoryRequest,
} from '@resala/shared';

import type { InventoryRepository } from '../../repositories/index.js';
import { ConflictError, NotFoundError } from '../../utils/ApiErrors.js';

export default class CategoryService {
  constructor(private readonly inventoryRepo: InventoryRepository) {}

  async createCategory(category: CreateCategoryRequest['body']) {
    await this.verifyCategoryExist(category.arName, category.enName);

    return await this.inventoryRepo.category.create({
      enName: category.enName,
      arName: category.arName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateCategory(id: number, category: UpdateCategoryRequest['body']) {
    await this.findCategoryById(id);

    return await this.inventoryRepo.category.update(id, {
      enName: category.enName,
      arName: category.arName,
      updatedAt: new Date(),
    });
  }

  async deleteCategory(id: number) {
    await this.findCategoryById(id);
    return await this.inventoryRepo.category.delete(id);
  }

  async findCategoryById(id: number): Promise<GetCategoryResponse['data']> {
    const category = await this.inventoryRepo.category.findById(id);
    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  async listCategories(): Promise<ListCategoriesResponse['data']> {
    return await this.inventoryRepo.category.list();
  }

  async listCategoryProducts(categoryId: number): Promise<GetCategoryProductsResponse['data']> {
    await this.findCategoryById(categoryId);

    return await this.inventoryRepo.product.listByCategory(categoryId);
  }

  async verifyCategoryExist(arName: string, enName: string) {
    const exist =
      (await this.inventoryRepo.category.findByName(arName)) ||
      (await this.inventoryRepo.category.findByName(enName));

    if (exist) {
      throw new ConflictError('Category exists');
    }
  }
}
