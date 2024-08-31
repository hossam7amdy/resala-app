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
import type { AddressService } from '../address/address.service.js';
import type { ShoppingService } from '../shopping/shopping.service.js';
import type { StockService } from '../stock/stock.service.js';

const SHIPPING = 60;
const ORDER_ATTRIBUTES = {
  orderItems: {
    include: {
      product: true,
      stock: {
        select: {
          size: { select: { name: true } },
          color: { select: { enName: true } },
        },
      },
    },
  },
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

    const orderItems = userCart.items.map(item => ({
      productId: item.product.id,
      stockId: item.stock.id,
      quantity: item.quantity,
      price: item.product.price,
      productName: `${item.product.enName} | ${item.product.arName}`,
      description: `${item.stock.size.name}, ${item.stock.color.enName}`,
    }));

    const newOrder = await this.db.order.create({
      data: {
        userId: userId,
        subtotal: subtotal,
        total: subtotal + SHIPPING,
        note: order.note,
        paymentMethod: order.paymentMethod,
        shippingDetails: {
          create: {
            address: {
              create: address,
            },
          },
        },
        orderItems: {
          createMany: {
            data: userCart.items.map(item => ({
              productId: item.product.id,
              stockId: item.stock.id,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      },
    });

    return { ...newOrder, shipping: SHIPPING, items: orderItems, address };
  }

  async list({
    page = 1,
    limit = 10,
    search = '',
    userId,
  }: ListOrdersRequest['query']): Promise<ListOrdersResponse['data']> {
    const filters: Prisma.OrderWhereInput = {
      OR: [
        { user: { email: { startsWith: search } } },
        { user: { phone: { startsWith: search } } },
        {
          orderItems: { some: { product: { enName: { contains: search, mode: 'insensitive' } } } },
        },
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
      orders: orders.map(order => ({
        ...order,
        orderItems: order.orderItems.map(({ stock, ...item }) => ({
          ...item,
          color: stock.color.enName,
          size: stock.size.name,
        })),
      })),
    };
  }

  async find(id: number): Promise<GetOrderResponse['data']> {
    const order = await this.db.order.findUniqueOrThrow({
      where: { id },
      include: ORDER_ATTRIBUTES,
    });

    return {
      ...order,
      orderItems: order.orderItems.map(({ stock, ...item }) => ({
        ...item,
        color: stock.color.enName,
        size: stock.size.name,
      })),
    };
  }

  async update(id: number, order: UpdateOrderRequest['body']) {
    await this.db.order.update({ where: { id }, data: order });

    return await this.find(id);
  }
}
