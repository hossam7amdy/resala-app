import type { Prisma } from '@prisma/client';

import prisma from '../../lib/prisma/index.js';
import { NotFoundError } from '../../utils/api-errors.js';
import { findColorById } from './color.js';
import { findProductById } from './product.js';
import { findSizeById } from './size.js';

export async function findStockById(stockId: number) {
  const stock = await prisma.stock.findUnique({
    include: {
      color: true,
      size: true,
      product: true,
    },
    where: { id: stockId },
  });

  if (!stock) {
    throw new NotFoundError('Stock not found');
  }

  return stock;
}

export async function getStocksList(query: { page: number; limit: number; query?: string }) {
  const { page, limit } = query;
  const search = query.query || '';

  const filters: Prisma.StockWhereInput = {
    OR: [
      { product: { arName: { contains: search, mode: 'insensitive' } } },
      { product: { enName: { contains: search, mode: 'insensitive' } } },
      { color: { arName: { contains: search, mode: 'insensitive' } } },
      { color: { enName: { contains: search, mode: 'insensitive' } } },
      { size: { name: { contains: search, mode: 'insensitive' } } },
    ],
  };
  const [total, stocks] = await prisma.$transaction([
    prisma.stock.count({ where: filters }),
    prisma.stock.findMany({
      include: {
        color: true,
        size: true,
        product: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        updatedAt: 'desc',
      },
      where: filters,
    }),
  ]);

  return { total, stocks };
}

export async function getProductStocks(productId: number) {
  return await prisma.stock.findMany({
    include: {
      color: true,
      size: true,
    },
    where: {
      productId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function updateStock(stock: Prisma.StockUncheckedCreateInput) {
  await Promise.all([
    findProductById(stock.productId),
    findColorById(stock.colorId),
    findSizeById(stock.sizeId),
  ]);

  return await prisma.stock.upsert({
    create: {
      productId: stock.productId,
      colorId: stock.colorId,
      sizeId: stock.sizeId,
      quantity: stock.quantity,
    },
    update: {
      quantity: stock.quantity,
    },
    where: {
      stock_unique_constraint: {
        productId: stock.productId,
        colorId: stock.colorId,
        sizeId: stock.sizeId,
      },
    },
  });
}

export async function deleteStock(stockId: number) {
  try {
    return await prisma.stock.delete({
      where: { id: stockId },
    });
  } catch (error) {
    throw new NotFoundError('Stock not found');
  }
}
