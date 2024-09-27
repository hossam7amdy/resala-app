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

export class DiscountService {
  constructor(private readonly db: DataStore) {}

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
          take: limit,
          orderBy: {
            discountId: 'desc',
          },
        },
      },
      where: {
        id: +discountId,
      },
    });

    return {
      ...discount,
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
  }: ListDiscountsRequest['query']): Promise<ListDiscountsResponse['data']> {
    const whereFilter = {
      isActive,
      isStoreWide,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
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
    return await this.db.discount.create({
      data: {
        ...data,
        discountProduct: {
          create: productIds?.length ? productIds.map(productId => ({ productId })) : undefined,
        },
      },
    });
  }

  async update(
    discountId: string,
    { productIds, ...data }: UpdateDiscountRequest['body']
  ): Promise<UpdateDiscountResponse['data']> {
    await this.db.discountProduct.deleteMany({
      where: {
        productId: {
          notIn: productIds,
        },
      },
    });

    return await this.db.discount.update({
      where: {
        id: +discountId,
      },
      data: {
        ...data,
        discountProduct: {
          create: productIds?.length ? productIds.map(productId => ({ productId })) : undefined,
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
