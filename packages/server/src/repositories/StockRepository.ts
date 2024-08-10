import type { Prisma, PrismaClient } from '@prisma/client';
import type { DefaultFilters, Stock } from '@resala/shared';

import type { PromiseReturnType } from '../utils/PromiseReturnType.js';

export default class StockRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Omit<Stock, 'id'>) {
    return await this.prisma.stock.create({ data });
  }

  async update(id: number, data: Partial<Stock>) {
    return await this.prisma.stock.update({ where: { id }, data });
  }

  async findMany(ids: number[]) {
    return await this.prisma.stock.findMany({ where: { id: { in: ids } } });
  }

  async updateQuantities(stocks: { stockId: number; quantity: number }[]) {
    await this.prisma.$transaction(
      stocks.map(stock => {
        return this.prisma.stock.update({
          where: { id: stock.stockId },
          data: { quantity: { increment: -stock.quantity } },
        });
      })
    );
  }

  async delete(id: number) {
    return await this.prisma.stock.delete({ where: { id } });
  }

  async findById(id: number) {
    const stocks = await this.prisma.stock.findUnique({
      include: {
        product: true,
        size: true,
        color: {
          include: {
            images: true,
          },
        },
      },
      where: { id },
    });

    if (!stocks) return null;

    this._filterImages([stocks]);
    return stocks;
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
        include: {
          product: true,
          size: true,
          color: {
            include: {
              images: true,
            },
          },
        },
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    this._filterImages(stocks);
    return { total, stocks };
  }

  async findByProduct(productId: number) {
    return await this.prisma.stock.findMany({
      include: {
        size: true,
        color: {
          include: {
            images: {
              where: { productId },
            },
          },
        },
      },
      where: { productId },
    });
  }

  private _filterImages(stocks: PromiseReturnType<StockRepository['list']>['stocks']) {
    stocks.forEach(stock => {
      stock.color.images = stock.color.images.filter(img => img.productId === stock.productId);
    });
  }
}
