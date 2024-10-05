import type {
  CreateDiscountRequest,
  CreateDiscountResponse,
  DeleteDiscountResponse,
  Discount,
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

type CartItem = GetCartResponse['data']['items'][number];
type ProductDiscount = Discount & { discountProduct: { productId: number }[] };

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

  private async _checkAnyStoreWideDiscountIsActive(discountId?: number) {
    const activeStoreWideDiscounts = await this.db.discount.findMany({
      where: {
        id: { not: discountId },
        isStoreWide: true,
        isActive: true,
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(new Date().toDateString()),
        },
      },
    });

    if (activeStoreWideDiscounts.length > 0) {
      throw new ConflictError('There is already an active store-wide discount');
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
          startDate: {
            lte: new Date(),
          },
          endDate: {
            gte: new Date(new Date().toDateString()),
          },
        },
      },
    });

    if (activeDiscounts.length > 0) {
      throw new ConflictError('Some products already have active discounts');
    }
  }

  private async _getApplicableDiscounts(productIds: number[]) {
    const commonFilters = {
      isActive: true,
      OR: [
        { startDate: null },
        { endDate: null },
        { startDate: { lte: new Date() } },
        { endDate: { gte: new Date(new Date().toDateString()) } },
      ],
    };

    const productDiscountsPromise = this.db.discount.findMany({
      include: {
        discountProduct: {
          where: {
            productId: {
              in: productIds,
            },
          },
        },
      },
      where: {
        ...commonFilters,
        isStoreWide: false,
      },
    });

    const storeWideDiscountsPromise = this.db.discount.findMany({
      where: {
        ...commonFilters,
        isStoreWide: true,
      },
    });

    const [productDiscounts, storeWideDiscounts] = await this.db.$transaction([
      productDiscountsPromise,
      storeWideDiscountsPromise,
    ]);

    return [...productDiscounts, ...storeWideDiscounts.map(d => ({ ...d, discountProduct: [] }))];
  }

  private _applyProductDiscount(item: CartItem, discounts: ProductDiscount[]): CartItem {
    let bestDiscount: Discount | undefined;
    let lowestPrice = item.product.price;

    for (const { discountProduct, ...discount } of discounts) {
      if (!discount.isStoreWide && !discountProduct.some(dp => dp.productId === item.product.id)) {
        continue;
      }

      let discountedPrice = item.product.price;

      switch (discount.type) {
        case 'PERCENTAGE':
          discountedPrice = item.product.price.sub(
            item.product.price.mul(discount.amount).div(100)
          );

          break;
        case 'BOGO': {
          const buyQuantity = discount.amount.toNumber();
          const freeQuantity = discount.minQty ?? 0;
          const cycleQuantity = buyQuantity + freeQuantity;
          const fullPriceCycles = Math.floor(item.quantity / cycleQuantity);
          const remainingItems = item.quantity % cycleQuantity;

          const fullPriceItems =
            fullPriceCycles * buyQuantity + Math.min(remainingItems, buyQuantity);
          discountedPrice = item.product.price.mul(fullPriceItems / item.quantity);
          break;
        }
      }

      if (discountedPrice < lowestPrice) {
        lowestPrice = discountedPrice;
        bestDiscount = discount;
      }
    }

    return {
      ...item,
      discountedPrice: lowestPrice.toNumber(),
      appliedDiscount: bestDiscount,
    };
  }

  private _applyCartLevelDiscounts(items: CartItem[], discounts: ProductDiscount[]): CartItem[] {
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price.mul(item.quantity).toNumber(),
      0
    );
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

    let bestDiscount: Discount | undefined;
    let lowestTotalPrice = items.reduce(
      (sum, item) => sum + item.discountedPrice! * item.quantity,
      0
    );

    for (const { discountProduct: _, ...discount } of discounts) {
      let discountedTotalPrice = lowestTotalPrice;

      switch (discount.type) {
        case 'FIXED': {
          const fixedPrice = discount.minQty ?? 0;
          if (totalPrice >= fixedPrice) {
            discountedTotalPrice = Math.max(0, discountedTotalPrice - discount.amount.toNumber());
          }
          break;
        }
        case 'BULK': {
          const fixedQty = discount.minQty ?? 0;
          if (totalQty >= fixedQty) {
            discountedTotalPrice = Math.max(0, discountedTotalPrice - discount.amount.toNumber());
          }
          break;
        }
      }

      if (discountedTotalPrice < lowestTotalPrice) {
        lowestTotalPrice = discountedTotalPrice;
        bestDiscount = discount;
      }
    }

    if (bestDiscount) {
      const discountFactor =
        lowestTotalPrice /
        items.reduce((sum, item) => sum + item.discountedPrice! * item.quantity, 0);
      return items.map(item => ({
        ...item,
        discountedPrice: item.discountedPrice! * discountFactor,
        appliedDiscount: bestDiscount,
      }));
    }

    return items;
  }

  async get(
    id: string,
    { page = 1, limit = 10 }: GetDiscountRequest['query']
  ): Promise<GetDiscountResponse['data']> {
    const discountId = +id;

    const [productsCount, { discountProduct, ...discount }] = await this.db.$transaction([
      this.db.discountProduct.count({ where: { discountId } }),
      this.db.discount.findUniqueOrThrow({
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
          id: discountId,
        },
      }),
    ]);

    return {
      ...discount,
      pagination: { page, limit, total: productsCount },
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
      data.isStoreWide ? this._checkAnyStoreWideDiscountIsActive() : Promise.resolve(),
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
      data.isStoreWide ? this._checkAnyStoreWideDiscountIsActive(+discountId) : Promise.resolve(),
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
    if (cart.items.length === 0) {
      return cart;
    }

    const productIds = [...new Set(cart.items.map(item => item.product.id))];
    const applicableDiscounts = await this._getApplicableDiscounts(productIds);

    let updatedItems = cart.items.map(item =>
      this._applyProductDiscount(item, applicableDiscounts)
    );

    const cartLevelDiscounts = applicableDiscounts.filter(
      d => d.type === 'BULK' || d.type === 'FIXED'
    );
    updatedItems = this._applyCartLevelDiscounts(updatedItems, cartLevelDiscounts);

    const totalDiscount = updatedItems.reduce(
      (sum, item) =>
        sum + item.product.price.sub(item.discountedPrice!).mul(item.quantity).toNumber(),
      0
    );
    const totalPrice = updatedItems.reduce(
      (sum, item) => sum + item.discountedPrice! * item.quantity,
      0
    );

    return {
      ...cart,
      items: updatedItems,
      totalDiscount: Math.round(totalDiscount),
      totalPrice: Math.round(totalPrice),
    };
  }
}
