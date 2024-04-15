import { Address, Order, OrderItem, Prisma } from '@prisma/client';

import prisma from '../lib/prisma';
import { BadRequestError, NotFoundError } from '../utils/api-errors';

const SHIPPING = 60;
interface CreateOrderInput {
  userId: number;
  address: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>;
  paymentMethod: Order['paymentMethod'];
  items: Pick<OrderItem, 'name' | 'price' | 'quantity' | 'color' | 'size'>[];
  note?: string;
}

export async function createOrder(order: CreateOrderInput) {
  const subtotal = order.items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  return await prisma.$transaction(async tx => {
    const newOrder = await tx.order.create({
      data: {
        userId: order.userId,
        subtotal,
        total: subtotal + SHIPPING,
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
        cost: SHIPPING,
      },
    });

    return newOrder;
  });
}

export async function listOrders(pagination: { limit: number; page: number }) {
  const { limit, page } = pagination;

  const [total, orders] = await prisma.$transaction([
    prisma.order.count(),
    prisma.order.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return { total, orders };
}

export async function findUserOrderById(id: number, userId: number) {
  const order = await prisma.order.findUnique({
    select: { id: true },
    where: { id, userId },
  });

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  return await findOrderById(id);
}

export async function findOrderById(id: number) {
  const order = await prisma.order.findUnique({
    include: {
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
          deletedAt: true,
        },
      },
      orderItems: true,
      paymentDetails: true,
      shippingDetails: {
        select: {
          id: true,
          cost: true,
          createdAt: true,
          updatedAt: true,
          address: true,
        },
      },
    },
    where: { id },
  });

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  return order;
}

export async function getUserOrders(
  userId: number,
  pagination: {
    limit: number;
    page: number;
  }
) {
  const { limit, page } = pagination;

  const [total, orders] = await prisma.$transaction([
    prisma.order.count({ where: { userId } }),
    prisma.order.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return { total, orders };
}

export async function updateOrder(id: number, order: Prisma.OrderUpdateInput) {
  await findOrderById(id);

  return await prisma.order.update({
    data: order,
    where: { id },
  });
}

export async function cancelUserOrder(id: number, userId: number) {
  const order = await findUserOrderById(id, userId);

  const isToday = new Date(order.createdAt).toDateString() === new Date().toDateString();
  if (!isToday) {
    throw new BadRequestError("You can't cancel this order. Please contact support");
  }

  return await cancelOrder(id);
}

export async function adminCancelOrder(id: number) {
  await findOrderById(id);

  return await cancelOrder(id);
}

async function cancelOrder(id: number) {
  return prisma.order.update({
    data: { orderStatus: 'CANCELLED' },
    where: { id },
    include: { paymentDetails: true },
  });
}
