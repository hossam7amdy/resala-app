import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RequestHandler } from 'express';

import { prisma } from '../../model';
import { BadRequestError, NotFoundError } from '../../utils/api-errors';

export const getUserCart: RequestHandler = async (_, res) => {
  const userId = res.locals.user.id;

  const cart = await prisma.cart.findMany({
    select: {
      stock: {
        select: {
          product: true,
          color: true,
          size: true,
        },
      },
    },
    where: { userId },
  });

  return res.json({
    success: true,
    data: cart,
  });
};

export const addItemToCart: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;
  const stockId = parseInt(req.body.stockId);
  const quantity = parseInt(req.body.quantity);

  const stock = await prisma.stock.findUnique({ where: { id: stockId } });
  if (!stock) {
    return next(new NotFoundError('Stock not found'));
  }

  if (stock.quantity < quantity) {
    return next(new BadRequestError('Stock not available'));
  }

  const cart = await prisma.cart.upsert({
    create: { userId, stockId, quantity },
    update: { userId, stockId, quantity },
    where: { userId_stockId: { userId, stockId } },
  });

  return res.json({
    success: true,
    data: cart,
  });
};

export const removeItemFromCart: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;
  const stockId = parseInt(req.params.stockId + '');

  try {
    await prisma.cart.delete({
      where: { userId_stockId: { userId, stockId } },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new NotFoundError('Item not found in cart'));
    }
    return next(error);
  }

  return res.json({
    success: true,
    data: 'Item removed from cart',
  });
};

export const getUserWishlist: RequestHandler = async (_, res) => {
  const userId = res.locals.user.id;

  const wishlist = await prisma.wishlist.findMany({
    select: {
      product: true,
    },
    where: { userId },
  });

  return res.json({
    success: true,
    data: wishlist,
  });
};

export const addProductToWishlist: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;
  const { productId } = req.body;

  let wishlist;
  try {
    wishlist = await prisma.wishlist.upsert({
      create: { userId, productId },
      update: { userId, productId },
      where: { userId_productId: { userId, productId } },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new NotFoundError('Product not found'));
    }

    return next(error);
  }

  return res.json({
    success: true,
    data: wishlist,
  });
};

export const removeProductFromWishlist: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;
  const productId = parseInt(req.params.productId);

  try {
    await prisma.wishlist.delete({
      where: { userId_productId: { userId, productId } },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new NotFoundError('Product not found in wishlist'));
    }
    return next(error);
  }

  return res.json({
    success: true,
    data: 'Product removed from wishlist',
  });
};
