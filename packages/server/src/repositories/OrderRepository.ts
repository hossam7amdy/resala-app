import type { Prisma, PrismaClient } from '@prisma/client';
import type { Address, DefaultFilters, Order, OrderItem } from '@resala/shared';

const ORDER_ATTRIBUTES = {
  orderItems: true,
  paymentDetails: true,
  user: {
    select: {
      id: true,
      email: true,
      isVerified: true,
      phone: true,
      firstName: true,
      lastName: true,
      role: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
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

interface CreateOrderInput {
  userId: number;
  address: Omit<Address, 'id'>;
  paymentMethod: Order['paymentMethod'];
  items: Pick<OrderItem, 'name' | 'price' | 'quantity' | 'color' | 'size'>[];
  shipping: number;
  total: number;
  subtotal: number;
  note?: string;
}

export default class OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(order: CreateOrderInput) {
    return await this.prisma.$transaction(async tx => {
      const newOrder = await tx.order.create({
        data: {
          userId: order.userId,
          subtotal: order.subtotal,
          total: order.total,
          note: order.note,
          paymentMethod: order.paymentMethod,
        },
      });
      await tx.orderItem.createMany({
        data: order.items.map(item => ({
          orderId: newOrder.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
      });
      const { id: addressId } = await tx.address.create({
        data: order.address,
      });
      await tx.shipping.create({
        data: {
          orderId: newOrder.id,
          addressId: addressId,
          cost: order.shipping,
        },
      });

      return newOrder;
    });
  }

  async update(id: number, order: Partial<Order>) {
    return await this.prisma.order.update({ where: { id }, data: order });
  }

  async findById(id: number) {
    return await this.prisma.order.findUnique({
      include: ORDER_ATTRIBUTES,
      where: { id },
    });
  }

  async list({ page, limit, query }: DefaultFilters) {
    const filters: Prisma.OrderWhereInput = {
      OR: [
        { id: { equals: Number(query) || undefined } },
        { user: { email: { startsWith: query } } },
        { user: { phone: { startsWith: query } } },
      ],
    };

    const [count, orders] = await this.prisma.$transaction([
      this.prisma.order.count({ where: filters }),
      this.prisma.order.findMany({
        include: ORDER_ATTRIBUTES,
        where: filters,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { total: count, orders };
  }

  async listByUser(userId: number, { page, limit }: Omit<DefaultFilters, 'query'>) {
    const [count, orders] = await this.prisma.$transaction([
      this.prisma.order.count({ where: { userId } }),
      this.prisma.order.findMany({
        include: ORDER_ATTRIBUTES,
        where: { userId },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { total: count, orders };
  }
}
