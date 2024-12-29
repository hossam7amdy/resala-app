'use server';

import { ROUTES } from '@/routes';
import { paymentService } from '@/services';
import { formatError } from '@/utils/formatError';
import type { GetPaymentResponse, RefundPaymentRequest, VoidPaymentRequest } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const findPaymentById = async (id: string): Promise<GetPaymentResponse['data']> => {
  return await paymentService.retrieve(id);
};

export const voidPayment = async (payload: VoidPaymentRequest['body']) => {
  try {
    await paymentService.void(payload.transactionId);

    revalidatePath(ROUTES.ORDERS);
    revalidatePath(ROUTES.STOCKS);

    return { success: true };
  } catch (e) {
    return formatError(e);
  }
};

export const refundPayment = async (payload: RefundPaymentRequest['body']) => {
  try {
    await paymentService.refund(payload.transactionId, payload.amount);

    revalidatePath(ROUTES.ORDERS);
    revalidatePath(ROUTES.STOCKS);

    return { success: true };
  } catch (e) {
    return formatError(e);
  }
};
