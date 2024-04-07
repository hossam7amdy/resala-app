import { Color, Product, Size } from '@prisma/client';

import { inventoryService } from '.';
import prisma from '../lib/prisma';
import { NotFoundError } from '../utils/api-errors';

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

export async function getUserCart(userId: number): Promise<CartItem[]> {
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
            quantity: true,
            product: true,
            color: true,
            size: true,
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
}

export async function addItemToCart(cartItem: {
  userId: number;
  stockId: number;
  quantity: number;
}): Promise<CartItem[]> {
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
}

export async function removeItemFromCart(userId: number, stockId: number): Promise<CartItem[]> {
  try {
    const cart = await prisma.cart.delete({
      where: { userId_stockId: { userId, stockId } },
    });

    return await getUserCart(cart.userId);
  } catch (error) {
    console.log(error);
    throw new NotFoundError('Item not found in cart');
  }
}

export async function clearUserCart(userId: number) {
  return await prisma.cart.deleteMany({ where: { userId } });
}

export async function getUserWishlist(userId: number): Promise<Product[]> {
  const wishlist = await prisma.wishlist.findMany({
    select: { product: true },
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return wishlist.map(item => item.product);
}

export async function addProductToWishlist(userId: number, productId: number): Promise<Product[]> {
  await inventoryService.findProductById(productId);

  const wishlist = await prisma.wishlist.upsert({
    create: { userId, productId },
    update: { userId, productId },
    where: { userId_productId: { userId, productId } },
  });

  return await getUserWishlist(wishlist.userId);
}

export async function removeProductFromWishlist(
  userId: number,
  productId: number
): Promise<Product[]> {
  try {
    await prisma.wishlist.delete({
      where: { userId_productId: { userId, productId } },
    });

    return await getUserWishlist(userId);
  } catch (error) {
    throw new NotFoundError('Product not found in wishlist');
  }
}

export async function removeUserWishlist(userId: number) {
  return await prisma.wishlist.deleteMany({ where: { userId } });
}
