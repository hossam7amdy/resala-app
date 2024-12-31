import { ConflictError, NotFoundError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  GetCategoryResponse,
  ListCategoriesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from '@resala/shared';

export class CategoryService {
  constructor(private readonly db: DataStore) {}

  async create(category: CreateCategoryRequest['body']): Promise<CreateCategoryResponse['data']> {
    return await this.db.category.create({
      data: {
        enName: category.enName,
        arName: category.arName,
      },
    });
  }

  async update(
    id: string,
    category: UpdateCategoryRequest['body']
  ): Promise<UpdateCategoryResponse['data']> {
    return await this.db.category.update({
      data: {
        enName: category.enName,
        arName: category.arName,
      },
      where: { id },
    });
  }

  async delete(id: string): Promise<DeleteCategoryResponse['data']> {
    const category = await this.db.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    const categoryProductsCount = category?._count?.products;
    if (categoryProductsCount) {
      throw new ConflictError(`Category has ${categoryProductsCount} products`);
    }

    return await this.db.category.delete({ where: { id } });
  }

  async find(id: string): Promise<GetCategoryResponse['data']> {
    return await this.db.category.findUniqueOrThrow({ where: { id } });
  }

  async list(): Promise<ListCategoriesResponse['data']> {
    return await this.db.category.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
