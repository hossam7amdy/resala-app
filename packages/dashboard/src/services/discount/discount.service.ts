import { ConflictError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
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

type CartItem = GetCartResponse['data']['items'][number];

export class DiscountService {
  constructor(private readonly db: DataStore) {}

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
        products: {
          where: {
            id: {
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

  private _calculateBestDiscount(items: CartItem[], discounts: Discount[]): CartItem[] {
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => item.product.price.mul(item.quantity).add(sum).toNumber(),
      0
    );

    const productPrice = items[0].product.price;
    let bestDiscount: Discount | undefined;
    let lowestTotalPrice = totalPrice;

    for (const discount of discounts) {
      let discountedTotalPrice = 0;

      switch (discount.type) {
        case 'PERCENTAGE':
          discountedTotalPrice = Math.max(
            0,
            totalPrice - discount.amount.div(100).mul(totalPrice).toNumber()
          );

          break;
        case 'BOGO': {
          const buyQuantity = discount.minQty;
          const freeQuantity = discount.amount.toNumber();
          const cycleQuantity = buyQuantity + freeQuantity;
          const fullPriceCycles = Math.floor(totalQty / cycleQuantity);

          discountedTotalPrice = fullPriceCycles
            ? totalPrice - productPrice.mul(fullPriceCycles * freeQuantity).toNumber()
            : totalPrice;

          break;
        }
      }

      if (discountedTotalPrice && discountedTotalPrice < lowestTotalPrice) {
        lowestTotalPrice = discountedTotalPrice;
        bestDiscount = discount;
      }
    }

    if (bestDiscount) {
      const discountFactor = lowestTotalPrice / totalPrice;

      return items.map(item => ({
        ...item,
        discountedPrice: item.product.price.mul(discountFactor).toDecimalPlaces(2).toNumber(),
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

    const { products, ...discount } = await this.db.discount.findUniqueOrThrow({
      include: {
        products: true,
      },
      where: {
        id: discountId,
      },
    });

    return {
      ...discount,
      products,
      pagination: { page, limit, total: products.length },
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
              products: true,
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
        productsCount: _count.products,
      })),
    };
  }

  async count(): Promise<number> {
    return await this.db.discount.count();
  }

  async create({
    productIds,
    ...data
  }: CreateDiscountRequest['body']): Promise<CreateDiscountResponse['data']> {
    await (data.isStoreWide ? this._checkAnyStoreWideDiscountIsActive() : Promise.resolve());

    return await this.db.discount.create({
      data: {
        ...data,
        products: {
          connect: productIds?.map(id => ({ id })),
        },
      },
    });
  }

  async update(
    discountId: string,
    data: UpdateDiscountRequest['body']
  ): Promise<UpdateDiscountResponse['data']> {
    const discount = await this.get(discountId, {});

    const isStoreWideActive = data.isStoreWide || discount.isStoreWide;
    if (isStoreWideActive && data.isActive) {
      await this._checkAnyStoreWideDiscountIsActive(+discountId);
    }

    return await this.db.discount.update({
      data,
      where: { id: +discountId },
    });
  }

  async delete(discountId: string): Promise<DeleteDiscountResponse['data']> {
    return await this.db.discount.delete({
      where: {
        id: +discountId,
      },
    });
  }

  async addProducts(discountId: number, productIds: number[]) {
    const discount = await this.db.discount.findUniqueOrThrow({
      where: { id: discountId },
    });

    if (discount.isStoreWide) {
      throw new ConflictError('Cannot add products to a store-wide discount');
    }

    return await this.db.discount.update({
      data: {
        products: {
          connect: productIds.map(id => ({ id })),
        },
      },
      where: {
        id: discountId,
      },
    });
  }

  async removeProducts(discountId: number, productIds: number[]) {
    await this.db.discount.update({
      data: {
        products: {
          disconnect: productIds.map(id => ({ id })),
        },
      },
      where: {
        id: discountId,
      },
    });
  }

  async applyDiscount(cart: GetCartResponse['data']): Promise<GetCartResponse['data']> {
    if (cart.items.length === 0) {
      return cart;
    }

    // 1. Group items by productId
    const productToItemsMap = cart.items.reduce((map, item) => {
      if (!map.has(item.product.id)) {
        map.set(item.product.id, []);
      }
      map.get(item.product.id)!.push(item);
      return map;
    }, new Map<number, CartItem[]>());

    // 2. Get applicable discounts for each product
    const productIds = Array.from(productToItemsMap.keys());
    const applicableDiscounts = await this._getApplicableDiscounts(productIds);

    if (applicableDiscounts.length === 0) {
      return cart;
    }

    const storeWideDiscounts = applicableDiscounts.filter(d => d.isStoreWide);

    const productDiscountsMap = applicableDiscounts.reduce((map, product) => {
      if (!map.has(product.id)) {
        map.set(product.id, []);
      }
      map.get(product.id)!.push(product);
      return map;
    }, new Map<number, Discount[]>());

    // 3. Calculate best discount for each product
    const updatedItems: GetCartResponse['data']['items'] = [];

    for (const [productId, items] of Array.from(productToItemsMap.entries())) {
      const discounts = productDiscountsMap.get(productId) ?? [];

      const bestDiscounts = this._calculateBestDiscount(items, [
        ...discounts,
        ...storeWideDiscounts,
      ]);

      updatedItems.push(...bestDiscounts);
    }

    const updatedTotalPrice = updatedItems.reduce(
      (sum, item) => sum + (item.discountedPrice ?? +item.product.price) * item.quantity,
      0
    );

    return {
      ...cart,
      items: updatedItems,
      totalPrice: Math.round(updatedTotalPrice),
      totalDiscount: Math.round(cart.totalPrice - updatedTotalPrice),
    };
  }
}
