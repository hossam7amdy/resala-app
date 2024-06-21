import type { Prisma, PrismaClient } from '@prisma/client';
import type { Category, DefaultFilters, Product, ProductImage } from '@resala/shared';

export default class ProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    return await this.prisma.product.create({ data: product });
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    return await this.prisma.product.update({ where: { id }, data: product });
  }

  async delete(id: number): Promise<Product> {
    return await this.prisma.product.delete({ where: { id } });
  }

  async list({ page, limit, query }: DefaultFilters): Promise<{
    products: (Product & { category: Category })[];
    total: number;
  }> {
    const filters: Prisma.ProductWhereInput = {
      OR: [
        { enName: { startsWith: query, mode: 'insensitive' } },
        { arName: { startsWith: query, mode: 'insensitive' } },
      ],
    };

    const [total, products] = await this.prisma.$transaction([
      this.prisma.product.count({ where: filters }),
      this.prisma.product.findMany({
        include: { category: true },
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return { products, total };
  }

  async listByCategory(categoryId: number): Promise<(Product & { category: Category })[]> {
    return await this.prisma.product.findMany({
      include: { category: true },
      where: { categoryId },
    });
  }

  async findById(id: number): Promise<(Product & { category: Category }) | null> {
    return await this.prisma.product.findUnique({
      include: { category: true },
      where: { id },
    });
  }

  async findByName(name: string): Promise<(Product & { category: Category }) | null> {
    return await this.prisma.product.findFirst({
      include: { category: true },
      where: { OR: [{ arName: name }, { enName: name }] },
    });
  }

  async addImages(images: Omit<ProductImage, 'id'>[]) {
    return await this.prisma.productImage.createMany({
      data: images,
    });
  }

  async deleteImage(imageId: number) {
    return await this.prisma.productImage.delete({
      where: { id: imageId },
    });
  }
}
