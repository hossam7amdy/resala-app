'use server';

import { ROUTES } from '@/routes';
import { orderService } from '@/services';
import type {
  // DeleteOrderRequest,
  // DeleteOrderResponse,
  // GetOrderRequest,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  UpdateOrderRequest, // UpdateOrderResponse,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const findOrderById = async (id: string): Promise<GetOrderResponse['data']> => {
  try {
    return await orderService.find(id);
  } catch {
    notFound();
  }
};

export const listOrders = async (
  query: ListOrdersRequest['query']
): Promise<ListOrdersResponse['data']> => {
  const page = +(query.page || '1');
  const limit = +(query.limit || '10');
  const search = query.search || undefined;

  return await orderService.list({ page, limit, search });
};

export const updateOrderStatus = async (id: string, payload: UpdateOrderRequest['body']) => {
  try {
    const data = await orderService.update(id, payload);
    revalidatePath(ROUTES.ORDERS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message };
  }
};

export const deleteOrder = async (_orderId: string, _userId: string) => {
  try {
    // TODO: handle order deletion
    revalidatePath(ROUTES.ORDERS);
  } catch (e) {
    return { error: (e as Error).message };
  }
};
