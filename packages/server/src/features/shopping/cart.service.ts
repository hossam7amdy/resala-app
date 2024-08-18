import type { CreateCartRequest, GetCartResponse } from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import { NotFoundError } from '../../errors/api.errors.js';

export class CartService {
  constructor(private readonly db: DataStore) {}

  async get(userId: number): Promise<GetCartResponse['data']> {
    const cart = await this.db.cart.findMany({
      include: {
        stock: {
          include: {
            size: true,
            product: true,
            color: {
              include: {
                images: true,
              },
            },
          },
        },
      },
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const cartItems = cart.map(item => ({
      userId: item.userId,
      quantity: item.quantity,
      createdAt: item.stock.createdAt,
      updatedAt: item.stock.updatedAt,
      product: item.stock.product,
      images: item.stock.color.images.map(img => ({
        id: img.id,
        imageKey: img.imageKey,
        imageUrl: img.imageUrl,
        isPrimary: img.isPrimary,
        createdAt: img.createdAt,
      })),
      stock: {
        id: item.stock.id,
        quantity: item.stock.quantity,
        createdAt: item.stock.createdAt,
        updatedAt: item.stock.updatedAt,
        color: item.stock.color,
        size: item.stock.size,
      },
    }));

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.product.price.mul(item.quantity).toDecimalPlaces(2).toNumber(),
      0
    );

    return {
      totalQuantity,
      totalPrice,
      items: cartItems,
    };
  }

  async update(
    userId: number,
    { stockId, quantity }: CreateCartRequest['body']
  ): Promise<GetCartResponse['data']> {
    const stock = await this.db.stock.findUniqueOrThrow({ where: { id: stockId } });

    if (stock.quantity < quantity) {
      throw new NotFoundError('Not enough stock');
    }

    const cart = { userId, stockId, quantity };

    await this.db.cart.upsert({
      create: cart,
      update: cart,
      where: {
        userId_stockId: { userId, stockId },
      },
    });

    return this.get(userId);
  }

  async delete(userId: number, stockId: number): Promise<GetCartResponse['data']> {
    await this.db.cart.delete({
      where: {
        userId_stockId: {
          userId,
          stockId,
        },
      },
    });

    return this.get(userId);
  }

  async deleteMany(userId: number) {
    await this.db.cart.deleteMany({
      where: {
        userId,
      },
    });
  }
}
