import { BadRequestError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
import type { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import type {
  CreateOrderRequestDto,
  CreateOrderResponseDto,
  GetOrderResponseDto,
  ListOrdersRequestDto,
  ListOrdersResponseDto,
  OrderDto,
} from './order.dto';

export class OrderService {
  constructor(private readonly db: DataStore) {}

  private _orderFields() {
    return {
      orderItems: {
        include: {
          product: {
            include: {
              images: {
                include: {
                  media: true,
                },
              },
            },
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
    const primaryImage = orderItems[0].product.images.find(img => img.isPrimary)!;
    return {
      ...order,
      orderItems: orderItems.map(({ stock, product: { images, ...product }, ...item }) => ({
        ...item,
        product,
        images: images
          .filter(img => img.colorId === stock.color.id)
          .map(({ media, ...img }) => ({ ...img, imageUrl: media.url })),
        image: { ...primaryImage, imageUrl: primaryImage.media.url },
        color: stock.color.enName,
        size: stock.size.name,
      })),
    };
  }

  async create({
    userId,
    paymentMethod,
    note,
    cart,
    shippingAddress,
  }: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
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
        paymentMethod,
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
  }: ListOrdersRequestDto): Promise<ListOrdersResponseDto> {
    const filters: Prisma.OrderWhereInput = {
      OR: [
        { number: parseInt(search) || undefined },
        { user: { email: { startsWith: search } } },
        { user: { phoneNumber: { startsWith: search } } },
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

  async find(id: string): Promise<GetOrderResponseDto> {
    const order = await this.db.order.findUniqueOrThrow({
      where: { id },
      include: this._orderFields(),
    });

    return this._transformOrder(order);
  }

  async update(id: string, order: Partial<OrderDto>): Promise<GetOrderResponseDto> {
    await this.db.order.update({
      where: { id },
      data: order,
    });

    return this.find(id);
  }
}
