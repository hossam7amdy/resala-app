import { BadRequestError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
import type { Order, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import type {
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  PaymentMethod,
} from '@resala/shared';

import type { CreateOrderRequestDto } from './order.dto';

export class OrderService {
  constructor(private readonly db: DataStore) {}

  private _orderFields() {
    return {
      orderItems: {
        include: {
          product: {
            include: { images: true },
          },
          stock: {
            select: {
              size: true,
              color: true,
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
    } satisfies Prisma.OrderInclude;
  }

  private _transformOrder({
    orderItems,
    ...order
  }: Prisma.OrderGetPayload<{
    include: ReturnType<OrderService['_orderFields']>;
  }>) {
    return {
      ...order,
      orderItems: orderItems.map(({ stock, product: { images, ...product }, ...item }) => ({
        ...item,
        product,
        images: images.filter(img => img.colorId === stock.color.id),
        image: images.find(img => img.colorId === stock.color.id && img.isPrimary)!,
        color: stock.color.enName,
        size: stock.size.name,
      })),
    };
  }

  async create({ userId, paymentMethod, note, cart, shippingAddress }: CreateOrderRequestDto) {
    if (cart.items.length === 0) {
      throw new BadRequestError('Cart is empty');
    }

    const subtotal = cart.totalPrice;

    const orderItems = cart.items.map(item => ({
      productId: item.product.id,
      stockId: item.stock.id,
      quantity: item.quantity,
      price: new Decimal(item.discountedPrice ?? item.product.price),
      productName: `${item.product.enName} | ${item.product.arName}`,
      description: `${item.stock.size.name}, ${item.stock.color.enName}`,
    }));

    const order = await this.db.order.create({
      data: {
        userId,
        subtotal: subtotal,
        total: subtotal,
        note,
        paymentMethod: paymentMethod as PaymentMethod,
        shippingDetails: {
          create: {
            address: {
              create: shippingAddress,
            },
          },
        },
        orderItems: {
          createMany: {
            data: orderItems.map(item => ({
              productId: item.productId,
              stockId: item.stockId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      },
    });

    return { ...order, orderItems };
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
        { user: { phoneNumber: { startsWith: search } } },
        {
          orderItems: { some: { product: { enName: { contains: search, mode: 'insensitive' } } } },
        },
      ],
      userId: userId,
    };

    const [count, orders] = await this.db.$transaction([
      this.db.order.count({ where: filters }),
      this.db.order.findMany({
        include: this._orderFields(),
        where: filters,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      pagination: { total: count, page, limit },
      orders: orders.map(this._transformOrder),
    };
  }

  async find(id: string): Promise<GetOrderResponse['data']> {
    const order = await this.db.order.findUniqueOrThrow({
      where: { id },
      include: this._orderFields(),
    });

    return this._transformOrder(order);
  }

  async update(id: string, order: Partial<Order>): Promise<GetOrderResponse['data']> {
    await this.db.order.update({ where: { id }, data: order });

    return await this.find(id);
  }
}
