import type { PrismaClient } from '@prisma/client';
import type { Category } from '@resala/shared';

export default class CategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(category: Omit<Category, 'id'>): Promise<Category> {
    return await this.prisma.category.create({ data: category });
  }

  async update(id: number, category: Partial<Category>): Promise<Category> {
    return await this.prisma.category.update({ where: { id }, data: category });
  }

  async delete(id: number): Promise<Category> {
    return await this.prisma.category.delete({ where: { id } });
  }

  async list(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findById(id: number): Promise<Category | null> {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.prisma.category.findFirst({
      where: {
        OR: [{ arName: name }, { enName: name }],
      },
    });
  }
}
