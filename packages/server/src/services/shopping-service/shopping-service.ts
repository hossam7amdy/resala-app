import type { Color, Product, Size } from '@prisma/client';

import prisma from '../../lib/prisma/index.js';
import { NotFoundError } from '../../utils/api-errors.js';
import { inventoryService } from '../index.js';

export interface CartItem {
  userId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  stock: {
    id: number;
    quantity: number;
    product: Product;
    color: Color;
    size: Size;
  };
}

export const getUserCart = async (userId: number) => {
  try {
    return await prisma.cart.findMany({
      select: {
        userId: true,
        quantity: true,
        createdAt: true,
        updatedAt: true,
        stock: {
          select: {
            id: true,
            color: true,
            size: true,
            product: {
              include: {
                images: true,
                category: true,
              },
            },
          },
        },
      },
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.log(error);
    throw new NotFoundError('User not found');
  }
};

export const addItemToCart = async (cartItem: {
  userId: number;
  stockId: number;
  quantity: number;
}) => {
  const stock = await inventoryService.findStockById(cartItem.stockId);

  if (stock.quantity < cartItem.quantity) {
    throw new NotFoundError('Not enough stock');
  }

  try {
    const cart = await prisma.cart.upsert({
      create: cartItem,
      update: cartItem,
      where: {
        userId_stockId: {
          userId: cartItem.userId,
          stockId: cartItem.stockId,
        },
      },
    });

    return await getUserCart(cart.userId);
  } catch (error) {
    console.log(error);
    throw new NotFoundError('User not found');
  }
};

export const removeItemFromCart = async (userId: number, stockId: number) => {
  try {
    const cart = await prisma.cart.delete({
      where: { userId_stockId: { userId, stockId } },
    });

    return await getUserCart(cart.userId);
  } catch (error) {
    console.log(error);
    throw new NotFoundError('Item not found in cart');
  }
};

export const clearUserCart = async (userId: number) => {
  return await prisma.cart.deleteMany({ where: { userId } });
};

export const getUserWishlist = async (userId: number) => {
  const wishlist = await prisma.wishlist.findMany({
    select: {
      product: {
        include: {
          images: true,
          category: true,
        },
      },
    },
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return wishlist.map(item => item.product);
};

export const addProductToWishlist = async (userId: number, productId: number) => {
  await inventoryService.findProductById(productId);

  const wishlist = await prisma.wishlist.upsert({
    create: { userId, productId },
    update: { userId, productId },
    where: { userId_productId: { userId, productId } },
  });

  return await getUserWishlist(wishlist.userId);
};

export const removeProductFromWishlist = async (userId: number, productId: number) => {
  try {
    await prisma.wishlist.delete({
      where: { userId_productId: { userId, productId } },
    });

    return await getUserWishlist(userId);
  } catch (error) {
    throw new NotFoundError('Product not found in wishlist');
  }
};

export const removeUserWishlist = async (userId: number) => {
  return await prisma.wishlist.deleteMany({ where: { userId } });
};
