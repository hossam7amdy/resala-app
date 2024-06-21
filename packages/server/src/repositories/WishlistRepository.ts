import type { PrismaClient } from '@prisma/client';
import type { Wishlist } from '@resala/shared';

export default class WishlistRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async update(wishlist: Omit<Wishlist, 'id'>) {
    return await this.prisma.wishlist.upsert({
      create: wishlist,
      update: wishlist,
      where: {
        userId_productId: {
          userId: wishlist.userId,
          productId: wishlist.productId,
        },
      },
    });
  }

  async list(userId: number) {
    return await this.prisma.wishlist.findMany({
      select: {
        userId: true,
        createdAt: true,
        updatedAt: true,
        product: true,
      },
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(userId: number, productId: number) {
    return await this.prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }

  async deleteAll(userId: number) {
    return await this.prisma.wishlist.deleteMany({
      where: {
        userId,
      },
    });
  }
}
