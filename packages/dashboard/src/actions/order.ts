'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { DeleteOrderRequest, DeleteOrderResponse } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const updateOrderStatus = async (id: string | number, payload: { status: string }) => {
  const response = await callEndpoint(ENDPOINT_CONFIGS.updateOrderStatus, {
    params: { orderId: Number(id) },
    body: payload,
  });

  revalidatePath(ROUTES.ORDERS);
  return response;
};

export const deleteOrder = async (id: string | number) => {
  const response = await callEndpoint<DeleteOrderRequest, DeleteOrderResponse>(
    ENDPOINT_CONFIGS.adminDeleteOrder,
    { params: { orderId: Number(id) } }
  );

  revalidatePath(ROUTES.ORDERS);
  return response;
};
