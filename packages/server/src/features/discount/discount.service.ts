import type {
  CreateDiscountRequest,
  CreateDiscountResponse,
  DeleteDiscountResponse,
  GetCartResponse,
  GetDiscountRequest,
  GetDiscountResponse,
  ListDiscountsRequest,
  ListDiscountsResponse,
  UpdateDiscountRequest,
  UpdateDiscountResponse,
} from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import { ConflictError, NotFoundError } from '../../errors/api.errors.js';

export class DiscountService {
  constructor(private readonly db: DataStore) {}

  private async _checkProductsExist(productIds: number[]) {
    if (productIds.length === 0) {
      return Promise.resolve();
    }

    const productsExist = await this.db.product.findMany({
      select: {
        id: true,
      },
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (productsExist.length !== productIds.length) {
      throw new NotFoundError('Some products do not exist');
    }
  }

  private async _checkProductsDoNotHaveActiveDiscount(productIds: number[], discountId?: number) {
    if (productIds.length === 0) {
      return Promise.resolve();
    }

    const activeDiscounts = await this.db.discountProduct.findMany({
      where: {
        productId: {
          in: productIds,
        },
        discount: {
          id: {
            not: discountId,
          },
          isActive: true,
          endDate: {
            gte: new Date(),
          },
        },
      },
    });

    if (activeDiscounts.length > 0) {
      throw new ConflictError('Some products already have active discounts');
    }
  }

  async get(
    discountId: string,
    { page = 1, limit = 10 }: GetDiscountRequest['query']
  ): Promise<GetDiscountResponse['data']> {
    const { discountProduct, ...discount } = await this.db.discount.findUniqueOrThrow({
      include: {
        discountProduct: {
          include: {
            product: true,
          },
          skip: (page - 1) * limit,
          take: limit + 1,
          orderBy: {
            discountId: 'desc',
          },
        },
      },
      where: {
        id: +discountId,
      },
    });

    const hasMore = discountProduct.length > limit;

    if (hasMore) {
      discountProduct.pop();
    }

    return {
      ...discount,
      hasMore,
      products: discountProduct.map(dp => dp.product),
    };
  }

  async list({
    page = 1,
    limit = 10,
    isActive,
    isStoreWide,
    startDate,
    endDate,
    type,
  }: ListDiscountsRequest['query']): Promise<ListDiscountsResponse['data']> {
    const whereFilter = {
      type,
      isActive,
      isStoreWide,
      startDate: startDate ? { gte: new Date(startDate) } : undefined,
      endDate: endDate ? { lte: new Date(endDate) } : undefined,
    };

    const [count, discounts] = await this.db.$transaction([
      this.db.discount.count({
        where: whereFilter,
      }),
      this.db.discount.findMany({
        where: whereFilter,
        include: {
          _count: {
            select: {
              discountProduct: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return {
      pagination: { page, limit, total: count },
      discounts: discounts.map(({ _count, ...discount }) => ({
        ...discount,
        productsCount: _count.discountProduct,
      })),
    };
  }

  async create({
    productIds,
    ...data
  }: CreateDiscountRequest['body']): Promise<CreateDiscountResponse['data']> {
    productIds ??= [];

    await Promise.all([
      this._checkProductsExist(productIds),
      this._checkProductsDoNotHaveActiveDiscount(productIds),
    ]);

    return await this.db.discount.create({
      data: {
        ...data,
        discountProduct: {
          createMany: productIds.length
            ? {
                data: productIds.map(productId => ({ productId })),
                skipDuplicates: true,
              }
            : undefined,
        },
      },
    });
  }

  async update(
    discountId: string,
    { productIds, ...data }: UpdateDiscountRequest['body']
  ): Promise<UpdateDiscountResponse['data']> {
    productIds ??= [];

    await this.get(discountId, {});
    await Promise.all([
      this._checkProductsExist(productIds),
      this._checkProductsDoNotHaveActiveDiscount(productIds, +discountId),
    ]);

    return await this.db.discount.update({
      where: {
        id: +discountId,
      },
      data: {
        ...data,
        discountProduct: {
          createMany: productIds?.length
            ? {
                data: productIds.map(productId => ({ productId })),
                skipDuplicates: true,
              }
            : undefined,
          deleteMany: productIds?.length
            ? {
                productId: {
                  notIn: productIds,
                },
              }
            : undefined,
        },
      },
    });
  }

  async delete(discountId: string): Promise<DeleteDiscountResponse['data']> {
    return await this.db.discount.delete({
      where: {
        id: +discountId,
      },
    });
  }

  async applyDiscount(cart: GetCartResponse['data']): Promise<GetCartResponse['data']> {
    // 1. Group cart items by product id
    const groupedItems = cart.items.reduce(
      (acc, item) => {
        acc[item.product.id] = item;
        return acc;
      },
      {} as Record<number, (typeof cart.items)[0]>
    );

    // 2. Get active discounts for the cart products
    const productIds = Object.keys(groupedItems).map(Number);
    const activeDiscounts = await this.db.discountProduct.findMany({
      include: {
        discount: true,
      },
      where: {
        productId: { in: productIds },
        discount: {
          isActive: true,
          OR: [
            { startDate: null },
            { endDate: null },
            { startDate: { lte: new Date() } },
            { endDate: { gte: new Date(new Date().toDateString()) } },
          ],
        },
      },
    });

    // 3. Apply the highest discount for each product
    let totalDiscount = 0;
    const updatedItems = cart.items.map(item => {
      const applicableDiscounts = activeDiscounts.filter(d => d.productId === item.product.id);

      if (applicableDiscounts.length === 0) return item;

      const highestDiscount = applicableDiscounts.reduce((max, d) =>
        d.discount.amount > max.discount.amount ? d : max
      );

      const discountAmount =
        highestDiscount.discount.type === 'PERCENTAGE'
          ? highestDiscount.discount.amount.mul(item.product.price).round().toNumber() / 100
          : highestDiscount.discount.amount.toNumber();

      const discountedPrice = Math.max(item.product.price - discountAmount, 0);
      totalDiscount += (item.product.price - discountedPrice) * item.quantity;

      return {
        ...item,
        discountedPrice,
        appliedDiscount: {
          id: highestDiscount.discount.id,
          amount: highestDiscount.discount.amount,
          type: highestDiscount.discount.type,
        },
      };
    });

    // 4. Update cart totals
    const updatedCart: GetCartResponse['data'] = {
      ...cart,
      items: updatedItems,
      totalDiscount,
      totalPrice: cart.totalPrice - totalDiscount,
    };

    return updatedCart;
  }
}
