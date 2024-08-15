'use server';

import { callEndpoint } from '@/services/callEndpoint';
import { ROUTES } from '@/utils/routes';
import type {
  RefundPaymentRequest,
  RefundPaymentResponse,
  VoidPaymentRequest,
  VoidPaymentResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const voidPayment = async (data: VoidPaymentRequest['body']) => {
  const response = await callEndpoint<VoidPaymentRequest, VoidPaymentResponse>(
    ENDPOINT_CONFIGS.voidPayment,
    { body: data }
  );

  revalidatePath(ROUTES.ORDERS);
  return response;
};

export const refundPayment = async (payload: RefundPaymentRequest['body']) => {
  const response = await callEndpoint<RefundPaymentRequest, RefundPaymentResponse>(
    ENDPOINT_CONFIGS.refundPayment,
    { body: payload }
  );

  revalidatePath(ROUTES.ORDERS);
  return response;
};
