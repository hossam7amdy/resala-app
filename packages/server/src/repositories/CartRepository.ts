import type { PrismaClient } from '@prisma/client';
import type { Cart } from '@resala/shared';

export default class CartRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async list(userId: number) {
    return await this.prisma.cart.findMany({
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
  }

  async update(cart: Omit<Cart, 'id'>) {
    return await this.prisma.cart.upsert({
      create: cart,
      update: cart,
      where: {
        userId_stockId: {
          userId: cart.userId,
          stockId: cart.stockId,
        },
      },
    });
  }

  async delete(userId: number, stockId: number) {
    return await this.prisma.cart.delete({
      where: {
        userId_stockId: {
          userId,
          stockId,
        },
      },
    });
  }

  async deleteAll(userId: number) {
    return await this.prisma.cart.deleteMany({
      where: {
        userId,
      },
    });
  }
}
