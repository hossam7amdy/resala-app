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

export const findStockById = async (stockId: number) => {
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
};

export const getStocksList = async (query: { page: number; limit: number; query?: string }) => {
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
};

export const getProductStocks = async (productId: number) => {
  return await prisma.stock.findMany({
    select: {
      id: true,
      quantity: true,
      createdAt: true,
      updatedAt: true,
      color: true,
      size: true,
      product: true,
    },
    where: {
      productId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const createStock = async (stock: StockPayload) => {
  await Promise.all([
    findProductById(stock.productId),
    findColorById(stock.colorId),
    findSizeById(stock.sizeId),
  ]);

  const { id } = await prisma.stock.create({
    data: stock,
  });

  return await findStockById(id);
};

export const updateStock = async (stockId: number, stock: StockPayload) => {
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

  await prisma.stock.update({
    data: stock,
    where: { id: stockId },
  });

  return await findStockById(stockId);
};

export const deleteStock = async (stockId: number) => {
  try {
    return await prisma.stock.delete({
      where: { id: stockId },
    });
  } catch (error) {
    throw new NotFoundError('Stock not found');
  }
};
