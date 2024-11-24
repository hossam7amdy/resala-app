import type { DataStore } from '@/lib/db';
import type { Prisma } from '@prisma/client';
import type {
  Address,
  GetCartResponse,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  PaymentMethod,
  UpdateOrderRequest,
} from '@resala/shared';

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
  constructor(private readonly db: DataStore) {}

  async create(
    { userId, paymentMethod, note }: { userId: string; paymentMethod: string; note?: string },
    cart: GetCartResponse['data'],
    address: Address
  ) {
    if (cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    const subtotal = cart.totalPrice;

    const orderItems = cart.items.map(item => ({
      productId: item.product.id,
      stockId: item.stock.id,
      quantity: item.quantity,
      price: item.discountedPrice ?? item.product.price,
      productName: `${item.product.enName} | ${item.product.arName}`,
      description: `${item.stock.size.name}, ${item.stock.color.enName}`,
    }));

    const { id: _, ...addressWithoutId } = address;
    const newOrder = await this.db.order.create({
      data: {
        userId: userId,
        subtotal: subtotal,
        total: subtotal + SHIPPING,
        note,
        paymentMethod: paymentMethod as PaymentMethod,
        shippingDetails: {
          create: {
            address: {
              create: addressWithoutId,
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
        {
          orderItems: { some: { product: { enName: { contains: search, mode: 'insensitive' } } } },
        },
      ],
      userId,
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
