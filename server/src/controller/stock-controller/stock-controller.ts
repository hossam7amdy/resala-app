import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RequestHandler } from 'express';

import { prisma } from '../../model';
import { BadRequestError, NotFoundError } from '../../utils/api-errors';

export const getStock: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.stockId);

  const stock = await prisma.stock.findUnique({
    include: {
      product: true,
      color: true,
      size: true,
    },
    where: { id },
  });

  if (!stock) {
    return next(new NotFoundError('Stock not found'));
  }

  return res.json({
    success: true,
    data: stock,
  });
};

export const getStocksList: RequestHandler = async (_req, res, _next) => {
  const stocks = await prisma.stock.findMany({
    include: {
      product: true,
      color: true,
      size: true,
    },
  });
  return res.json({
    success: true,
    data: stocks,
  });
};

export const createStock: RequestHandler = async (req, res, next) => {
  const productId = req.body.productId;
  const colorId = parseInt(req.body.colorId);
  const sizeId = parseInt(req.body.sizeId);
  const quantity = parseInt(req.body.quantity);

  const stockExist = await prisma.stock.findFirst({
    where: {
      productId,
      colorId,
      sizeId,
    },
  });
  if (stockExist) {
    return next(new BadRequestError('Stock already exists'));
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }

  const color = await prisma.color.findUnique({ where: { id: colorId } });
  if (!color) {
    return next(new NotFoundError('Color not found'));
  }

  const size = await prisma.size.findUnique({ where: { id: sizeId } });
  if (!size) {
    return next(new NotFoundError('Size not found'));
  }

  const stock = await prisma.stock.create({
    data: {
      productId,
      colorId,
      sizeId,
      quantity,
    },
  });

  return res.status(201).json({
    success: true,
    data: stock,
  });
};

export const updateStock: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.stockId);
  const quantity = parseInt(req.body.quantity);

  let stock;
  try {
    stock = await prisma.stock.update({
      where: { id },
      data: { quantity },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new NotFoundError('Stock not found'));
    }
    return next(error);
  }

  return res.json({
    success: true,
    data: stock,
  });
};
