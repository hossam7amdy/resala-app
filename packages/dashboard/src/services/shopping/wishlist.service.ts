import { NotFoundError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
import type { GetWishlistResponse } from '@resala/shared';

export class WishlistService {
  constructor(private readonly db: DataStore) {}

  async get(userId: number): Promise<GetWishlistResponse['data']> {
    return await this.db.wishlist.findMany({
      include: { product: true },
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(userId: number, productId: number): Promise<GetWishlistResponse['data']> {
    const wishlist = { userId, productId };

    await this.db.wishlist.upsert({
      create: wishlist,
      update: wishlist,
      where: {
        userId_productId: wishlist,
      },
    });

    return this.get(userId);
  }

  async delete(userId: number, productId: number): Promise<GetWishlistResponse['data']> {
    try {
      await this.db.wishlist.delete({
        where: {
          userId_productId: { userId, productId },
        },
      });

      return this.get(userId);
    } catch {
      throw new NotFoundError('Product not found in wishlist');
    }
  }

  async deleteMany(userId: number) {
    await this.db.wishlist.deleteMany({
      where: {
        userId,
      },
    });
  }

  async merge(userId: number, guestId: number) {
    await this.db.wishlist.updateMany({
      where: {
        userId: guestId,
      },
      data: {
        userId,
      },
    });
  }
}
