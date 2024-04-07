import { Prisma } from '@prisma/client';

import prisma from '../../lib/prisma';
import { NotFoundError } from '../../utils/api-errors';
import { findColorById } from './color';
import { findProductById } from './product';
import { findSizeById } from './size';

export async function findStockById(stockId: number) {
  const stock = await prisma.stock.findUnique({
    where: { id: stockId },
  });

  if (!stock) {
    throw new NotFoundError('Stock not found');
  }

  return stock;
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
  });
}

export async function updateProductStock(stock: Prisma.StockUncheckedCreateInput) {
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

export async function deleteProductStock(productId: number, stockId: number) {
  try {
    return await prisma.stock.delete({
      where: {
        id: stockId,
        productId,
      },
    });
  } catch (error) {
    throw new NotFoundError('Stock not found');
  }
}
