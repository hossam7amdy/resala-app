import type { Prisma, PrismaClient } from '@prisma/client';
import type { DefaultFilters, Stock } from '@resala/shared';

export default class StockRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Omit<Stock, 'id'>) {
    return await this.prisma.stock.create({ data });
  }

  async findById(id: number) {
    return await this.prisma.stock.findUnique({
      select: {
        id: true,
        quantity: true,
        createdAt: true,
        updatedAt: true,
        product: true,
        size: true,
        color: {
          include: {
            images: {
              select: {
                id: true,
                imageKey: true,
                imageUrl: true,
                createdAt: true,
              },
            },
          },
        },
      },
      where: { id },
    });
  }

  async list({ page, limit, query }: DefaultFilters) {
    const filters: Prisma.StockWhereInput = {
      OR: [
        { product: { arName: { contains: query, mode: 'insensitive' } } },
        { product: { enName: { contains: query, mode: 'insensitive' } } },
        { color: { arName: { contains: query, mode: 'insensitive' } } },
        { color: { enName: { contains: query, mode: 'insensitive' } } },
        { size: { name: { contains: query, mode: 'insensitive' } } },
      ],
    };

    const [total, stocks] = await this.prisma.$transaction([
      this.prisma.stock.count({ where: filters }),
      this.prisma.stock.findMany({
        select: {
          id: true,
          quantity: true,
          createdAt: true,
          updatedAt: true,
          product: true,
          size: true,
          color: {
            include: {
              images: {
                select: {
                  id: true,
                  imageKey: true,
                  imageUrl: true,
                  createdAt: true,
                },
              },
            },
          },
        },
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return { total, stocks };
  }

  async update(id: number, data: Partial<Stock>) {
    return await this.prisma.stock.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.prisma.stock.delete({ where: { id } });
  }

  async findByProduct(productId: number) {
    return await this.prisma.stock.findMany({
      select: {
        id: true,
        quantity: true,
        createdAt: true,
        updatedAt: true,
        product: true,
        size: true,
        color: {
          include: {
            images: {
              select: {
                id: true,
                imageKey: true,
                imageUrl: true,
                createdAt: true,
              },
            },
          },
        },
      },
      where: { productId },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
