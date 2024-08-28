import type { Prisma } from '@prisma/client';
import type {
  CreateOrderRequest,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  UpdateOrderRequest,
} from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import { BadRequestError } from '../../errors/api.errors.js';
import { AddressService } from '../address/address.service.js';
import type { ShoppingService } from '../shopping/shopping.service.js';
import type { StockService } from '../stock/stock.service.js';

const SHIPPING = 60;
const ORDER_ATTRIBUTES = {
  orderItems: true,
  paymentDetails: true,
  user: true,
  shippingDetails: {
    select: {
      id: true,
      cost: true,
      createdAt: true,
      updatedAt: true,
      address: true,
    },
  },
};

export class OrderService {
  constructor(
    private readonly db: DataStore,
    private readonly addressService: AddressService,
    private readonly stockService: StockService,
    private readonly shoppingService: ShoppingService
  ) {}

  async create(userId: number, order: CreateOrderRequest['body']) {
    const userCart = await this.shoppingService.cart.get(userId);

    if (userCart.items.length === 0) {
      throw new BadRequestError('Cart is empty');
    }

    // eslint-disable-next-line no-unused-vars
    const { id: _, ...address } = await this.addressService.find(userId, order.addressId);

    const subtotal = userCart.totalPrice;

    await this.shoppingService.cart.deleteMany(userId);

    await this.stockService.decrease(
      userCart.items.map(item => ({
        id: item.stock.id,
        quantity: item.quantity,
      }))
    );

    let orderItems = userCart.items.map(item => ({
      name: item.product.enName,
      price: item.product.price,
      color: item.stock.color.enName,
      size: item.stock.size.name,
      quantity: item.quantity,
      imageUrl: item.images.find(img => img.isPrimary)?.imageUrl || null,
    }));
    const newOrder = await this.db.$transaction(async tx => {
      const newOrder = await tx.order.create({
        data: {
          userId: userId,
          subtotal: subtotal,
          total: subtotal + SHIPPING,
          note: order.note,
          paymentMethod: order.paymentMethod,
        },
      });
      await tx.orderItem.createMany({
        data: orderItems.map(item => ({ ...item, orderId: newOrder.id })),
      });
      const { id: addressId } = await tx.address.create({
        data: address,
      });
      await tx.shipping.create({
        data: {
          orderId: newOrder.id,
          addressId: addressId,
          cost: SHIPPING,
        },
      });

      return newOrder;
    });

    return { ...newOrder, shipping: SHIPPING, items: orderItems, address };
  }

  async list({
    page = 1,
    limit = 10,
    search,
    userId,
  }: ListOrdersRequest['query']): Promise<ListOrdersResponse['data']> {
    const filters: Prisma.OrderWhereInput = {
      OR: [
        { user: { email: { startsWith: search } } },
        { user: { phone: { startsWith: search } } },
      ],
      userId: userId,
    };

    const [count, orders] = await this.db.$transaction([
      this.db.order.count({ where: filters }),
      this.db.order.findMany({
        include: ORDER_ATTRIBUTES,
        where: filters,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      pagination: { total: count, page, limit },
      orders,
    };
  }

  async find(id: number): Promise<GetOrderResponse['data']> {
    return await this.db.order.findUniqueOrThrow({ where: { id }, include: ORDER_ATTRIBUTES });
  }

  async update(id: number, order: UpdateOrderRequest['body']) {
    await this.db.order.update({ where: { id }, data: order });

    return await this.find(id);
  }
}
