'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/utils/routes';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { DeleteOrderRequest, DeleteOrderResponse } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const updateOrderStatus = async (
  id: string | number,
  payload: {
    paymentStatus: string;
    orderStatus: string;
  }
) => {
  const response = await callEndpoint(ENDPOINT_CONFIGS.updateOrderStatus, {
    params: { orderId: Number(id) },
    body: payload,
  });

  revalidatePath(ROUTES.ORDERS);
  return response;
};

export const deleteOrder = async (orderId: string | number, userId: string | number) => {
  const response = await callEndpoint<DeleteOrderRequest, DeleteOrderResponse>(
    ENDPOINT_CONFIGS.deleteOrder,
    { params: { orderId: orderId.toString() }, query: { userId: userId.toString() } }
  );

  revalidatePath(ROUTES.ORDERS);
  return response;
};
