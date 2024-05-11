import type { Prisma } from '@prisma/client';

import prisma from '../../lib/prisma/index.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';
import { findColorById } from './color.js';
import { findProductById } from './product.js';
import { findSizeById } from './size.js';

type StockPayload = Pick<
  Prisma.StockUncheckedCreateInput,
  'productId' | 'colorId' | 'sizeId' | 'quantity'
>;

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

export async function createStock(stock: StockPayload) {
  await Promise.all([
    findProductById(stock.productId),
    findColorById(stock.colorId),
    findSizeById(stock.sizeId),
  ]);

  return await prisma.stock.create({
    data: stock,
  });
}

export async function updateStock(stockId: number, stock: StockPayload) {
  // Make sure the product, color and size exist
  await Promise.all([
    findProductById(stock.productId),
    findColorById(stock.colorId),
    findSizeById(stock.sizeId),
    findStockById(stockId),
  ]);

  // Check if the stock already exist
  const exist = await prisma.stock.findUnique({
    where: {
      stock_unique_constraint: {
        productId: stock.productId,
        colorId: stock.colorId,
        sizeId: stock.sizeId,
      },
    },
  });
  if (exist && exist.id !== stockId) {
    throw new ConflictError('Stock already exist!');
  }

  return await prisma.stock.update({
    data: stock,
    where: { id: stockId },
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
