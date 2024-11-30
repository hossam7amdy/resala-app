'use server';

import { ROUTES } from '@/routes';
import { orderService } from '@/services';
import type {
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const findOrderById = async (id: string | number): Promise<GetOrderResponse['data']> => {
  try {
    return await orderService.find(+id);
  } catch {
    notFound();
  }
};

export const listOrders = async (
  query: ListOrdersRequest['query']
): Promise<ListOrdersResponse['data']> => {
  return await orderService.list(query);
};

export const updateOrderStatus = async (
  id: string | number,
  payload: UpdateOrderRequest['body']
) => {
  try {
    const data = await orderService.update(+id, payload);
    revalidatePath(ROUTES.ORDERS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message };
  }
};

export const deleteOrder = async (orderId: string | number, userId: string | number) => {
  try {
    // TODO: handle order deletion
    revalidatePath(ROUTES.ORDERS);
  } catch (e) {
    return { error: (e as Error).message };
  }
};
