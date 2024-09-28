import type {
  CreateDiscountRequest,
  CreateDiscountResponse,
  DeleteDiscountResponse,
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
  constructor(private readonly db: DataStore) { }

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
          createMany: productIds.length ? {
            data: productIds.map(productId => ({ productId })), skipDuplicates: true
          } : undefined,
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
          createMany: productIds?.length ? {
            data: productIds.map(productId => ({ productId })), skipDuplicates: true
          } : undefined,
          deleteMany: productIds?.length ? {
            productId: {
              notIn: productIds,
            },
          } : undefined,
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
}
