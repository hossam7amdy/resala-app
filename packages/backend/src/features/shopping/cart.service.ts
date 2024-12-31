import { BadRequestError, NotFoundError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
import type { CreateCartRequest, GetCartResponse } from '@resala/shared';

const MAX_ITEMS_PER_STOCK = 12;

export class CartService {
  constructor(private readonly db: DataStore) {}

  async get(userId: string): Promise<GetCartResponse['data']> {
    const cart = await this.db.cart.findMany({
      include: {
        stock: {
          include: {
            size: true,
            product: {
              include: {
                images: true,
              },
            },
            color: true,
          },
        },
      },
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const cartItems = cart.map(
      ({
        userId,
        stock: {
          color,
          size,
          product: { images, ...product },
          ...stock
        },
        ...item
      }) => ({
        ...item,
        quantity: item.quantity > stock.quantity ? stock.quantity : item.quantity,
        userId,
        product,
        images: images.filter(image => image.colorId === color.id),
        stock: {
          ...stock,
          color,
          size,
        },
      })
    );

    // Validate cart items
    const validCartItems = cartItems.filter(item => item.quantity > 0);

    // Calculate total quantity and price
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.product.price.mul(item.quantity).toDecimalPlaces(2).toNumber(),
      0
    );

    return {
      totalQuantity,
      totalPrice,
      items: validCartItems,
    };
  }

  async update(
    userId: string,
    { stockId, quantity }: CreateCartRequest['body']
  ): Promise<GetCartResponse['data']> {
    const stock = await this.db.stock.findUniqueOrThrow({ where: { id: stockId } });
    if (stock.quantity < quantity) {
      throw new NotFoundError('Not enough stock');
    }

    if (quantity > MAX_ITEMS_PER_STOCK) {
      throw new BadRequestError(`Quantity should be less than or equal to ${MAX_ITEMS_PER_STOCK}`);
    }

    const cartData = { userId, stockId, quantity };
    await this.db.cart.upsert({
      create: cartData,
      update: cartData,
      where: {
        userId_stockId: { userId, stockId },
      },
    });

    return this.get(userId);
  }

  async delete(userId: string, stockId: string): Promise<GetCartResponse['data']> {
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

  async deleteMany(userId: string) {
    await this.db.cart.deleteMany({
      where: {
        userId,
      },
    });
  }

  async merge(userId: string, guestId: string) {
    await this.db.cart.updateMany({
      where: {
        userId: guestId,
      },
      data: {
        userId,
      },
    });
  }
}
