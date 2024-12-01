'use server';

import { ROUTES } from '@/routes';
import { paymentService } from '@/services';
import type {
  GetPaymentResponse,
  RefundPaymentRequest,
  RefundPaymentResponse,
  VoidPaymentRequest,
  VoidPaymentResponse,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const findPaymentById = async (id: string): Promise<GetPaymentResponse['data']> => {
  return await paymentService.retrieve(id);
};

export const voidPayment = async (
  payload: VoidPaymentRequest['body']
): Promise<VoidPaymentResponse> => {
  try {
    await paymentService.void(payload.transactionId);

    revalidatePath(ROUTES.ORDERS);
    revalidatePath(`payments/${payload.transactionId}`);

    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
};

export const refundPayment = async (
  payload: RefundPaymentRequest['body']
): Promise<RefundPaymentResponse> => {
  try {
    await paymentService.refund(payload.transactionId, payload.amount);

    revalidatePath(ROUTES.ORDERS);
    revalidatePath(`payments/${payload.transactionId}`);

    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
};
