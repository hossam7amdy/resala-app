'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import { sleep } from '@/lib/util';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { DeleteOrderRequest, DeleteOrderResponse } from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateOrderStatus = async (id: string | number, payload: { status: string }) => {
  try {
    console.log('updateOrderStatus', id, payload);
    await sleep(2000);
    revalidatePath(ROUTES.ORDERS);
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
  redirect(ROUTES.ORDERS);
};

export const deleteOrder = async (id: string | number) => {
  try {
    const response = await callEndpoint<DeleteOrderRequest, DeleteOrderResponse>(
      ENDPOINT_CONFIGS.deleteOrder,
      { params: { orderId: Number(id) } }
    );

    revalidatePath(ROUTES.ORDERS);
    return response.data;
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};
