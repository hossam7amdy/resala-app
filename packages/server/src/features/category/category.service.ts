import type {
  CreateCategoryRequest,
  GetCategoryResponse,
  ListCategoriesResponse,
  UpdateCategoryRequest,
} from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';

export class CategoryService {
  constructor(private readonly db: DataStore) {}

  async create(category: CreateCategoryRequest['body']) {
    return await this.db.category.create({
      data: {
        enName: category.enName,
        arName: category.arName,
      },
    });
  }

  async update(id: number, category: UpdateCategoryRequest['body']) {
    return await this.db.category.update({
      data: {
        enName: category.enName,
        arName: category.arName,
      },
      where: { id },
    });
  }

  async delete(id: number) {
    return await this.db.category.delete({ where: { id } });
  }

  async find(id: number): Promise<GetCategoryResponse['data']> {
    return await this.db.category.findUniqueOrThrow({ where: { id } });
  }

  async list(): Promise<ListCategoriesResponse['data']> {
    return await this.db.category.findMany();
  }
}
