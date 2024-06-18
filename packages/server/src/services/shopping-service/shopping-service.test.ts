/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import prismaMock from '../../lib/__mocks__/prisma.js';
import { NotFoundError } from '../../utils/api-errors.js';
import { shoppingService } from '../index.js';

vi.mock('lib/prisma/index.js', () => ({
  default: prismaMock,
}));

const MOCK_ADD_TO_CART = {
  userId: 1,
  stockId: 1,
  quantity: 2,
};

const MOCK_CART_ITEM = {
  userId: 1,
  stockId: 1,
  quantity: 3,
  createdAt: new Date('2024-03-25T04:13:15.391Z'),
  updatedAt: new Date('2024-03-25T04:13:15.391Z'),
  stock: {
    id: 6,
    quantity: 4,
    product: {
      id: 2,
      categoryId: 3,
      arName: 'فستان زفاف',
      enName: 'Wedding Dress',
      arDescription: 'فستان زفاف طويل',
      enDescription: 'Long Wedding Dress',
      price: '200',
      createdAt: new Date('2024-03-24T05:07:46.122Z'),
      updatedAt: new Date('2024-03-24T05:07:46.122Z'),
      deletedAt: null,
    },
    color: {
      id: 3,
      code: '#ffa500',
      arName: 'برتقالى',
      enName: 'orange',
      createdAt: new Date('2024-03-24T05:07:46.126Z'),
      updatedAt: new Date('2024-03-24T05:07:46.126Z'),
    },
    size: {
      id: 3,
      name: 'L',
      createdAt: new Date('2024-03-24T05:07:46.129Z'),
      updatedAt: new Date('2024-03-24T05:07:46.129Z'),
    },
  },
};

describe('Shopping Service', () => {
  beforeAll(() => {
    // mock console.log to prevent writing to the console
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserCart', () => {
    it('should return the user cart', async () => {
      const userId = 1;
      prismaMock.cart.findMany.mockResolvedValue([MOCK_CART_ITEM]);

      const cart = await shoppingService.getUserCart(userId);

      expect(cart).toEqual([MOCK_CART_ITEM]);
      expect(prismaMock.cart.findMany).toHaveBeenCalledWith({
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
    });

    it('should throw NotFoundError if user cart is not found', async () => {
      prismaMock.cart.findMany.mockRejectedValue(new NotFoundError());

      await expect(shoppingService.getUserCart(1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.cart.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('addItemToCart', () => {
    it('should add an item to the user cart', async () => {
      prismaMock.stock.findUnique.mockResolvedValue({ quantity: 5 } as any);
      prismaMock.cart.upsert.mockResolvedValue({ userId: 1 } as any);
      prismaMock.cart.findMany.mockResolvedValue([MOCK_CART_ITEM]);

      const cartItem = await shoppingService.addItemToCart(MOCK_ADD_TO_CART);
      expect(cartItem).toEqual([MOCK_CART_ITEM]);
      expect(prismaMock.cart.upsert).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if stock item is not found', async () => {
      prismaMock.stock.findUnique.mockResolvedValue({ quantity: 1 } as any);

      await expect(shoppingService.addItemToCart(MOCK_ADD_TO_CART)).rejects.toThrow(NotFoundError);
      expect(prismaMock.stock.findUnique).toHaveBeenCalledWith({
        include: {
          color: true,
          product: true,
          size: true,
        },
        where: { id: 1 },
      });
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove an item from the user cart', async () => {
      prismaMock.cart.findMany.mockResolvedValue([MOCK_CART_ITEM]);
      prismaMock.cart.delete.mockResolvedValue({ userId: 1 } as any);

      const cartItem = await shoppingService.removeItemFromCart(1, 1);
      expect(cartItem).toEqual([MOCK_CART_ITEM]);
      expect(prismaMock.cart.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if user cart or stock item is not found', async () => {
      prismaMock.cart.findMany.mockResolvedValue([]);
      prismaMock.cart.delete.mockRejectedValue(new NotFoundError());

      await expect(shoppingService.removeItemFromCart(1, 1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.cart.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearUserCart', () => {
    it('should clear the user cart', async () => {
      prismaMock.cart.deleteMany.mockResolvedValue({ count: 1 });

      const result = await shoppingService.clearUserCart(1);
      expect(result).toEqual({ count: 1 });
      expect(prismaMock.cart.deleteMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserWishlist', () => {
    it('should return the user wishlist', async () => {
      const userId = 1;
      prismaMock.wishlist.findMany.mockResolvedValue([MOCK_CART_ITEM.stock] as any);

      const wishlist = await shoppingService.getUserWishlist(userId);

      expect(wishlist).toEqual([MOCK_CART_ITEM.stock.product]);

      expect(prismaMock.wishlist.findMany).toHaveBeenCalledWith({
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
    });
  });

  describe('addProductToWishlist', () => {
    it('should add a product to the user wishlist', async () => {
      prismaMock.product.findUnique.mockResolvedValue(MOCK_CART_ITEM.stock.product as any);
      prismaMock.wishlist.upsert.mockResolvedValue({
        userId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      prismaMock.wishlist.findMany.mockResolvedValue([MOCK_CART_ITEM.stock] as any);

      const wishlist = await shoppingService.addProductToWishlist(1, 1);

      expect(wishlist).toEqual([MOCK_CART_ITEM.stock.product]);
      expect(prismaMock.wishlist.upsert).toHaveBeenCalledWith({
        create: { userId: 1, productId: 1 },
        update: { userId: 1, productId: 1 },
        where: { userId_productId: { userId: 1, productId: 1 } },
      });
    });

    it('should throw NotFoundError if product is not found', async () => {
      prismaMock.product.findUnique.mockRejectedValue(new NotFoundError());

      await expect(shoppingService.addProductToWishlist(1, 1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.wishlist.upsert).toHaveBeenCalledTimes(0);
    });
  });

  describe('removeProductFromWishlist', () => {
    it('should remove a product from the user wishlist', async () => {
      prismaMock.wishlist.delete.mockResolvedValue({ userId: 1 } as any);
      prismaMock.wishlist.findMany.mockResolvedValue([MOCK_CART_ITEM.stock] as any);

      const wishlist = await shoppingService.removeProductFromWishlist(1, 1);

      expect(wishlist).toEqual([MOCK_CART_ITEM.stock.product]);
      expect(prismaMock.wishlist.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if user wishlist or product is not found', async () => {
      prismaMock.wishlist.delete.mockRejectedValue(new NotFoundError());

      await expect(shoppingService.removeProductFromWishlist(1, 1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.wishlist.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeUserWishlist', () => {
    it('should remove the user wishlist', async () => {
      prismaMock.wishlist.deleteMany.mockResolvedValue({ count: 1 });

      const result = await shoppingService.removeUserWishlist(1);
      expect(result).toEqual({ count: 1 });
      expect(prismaMock.wishlist.deleteMany).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if user wishlist is not found', async () => {
      prismaMock.wishlist.deleteMany.mockRejectedValue(new NotFoundError());

      await expect(shoppingService.removeUserWishlist(1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.wishlist.deleteMany).toHaveBeenCalledTimes(1);
    });
  });
});
