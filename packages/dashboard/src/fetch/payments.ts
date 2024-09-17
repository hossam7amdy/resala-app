'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/utils/routes';
import type {
  GetPaymentRequest,
  GetPaymentResponse,
  RefundPaymentRequest,
  RefundPaymentResponse,
  VoidPaymentRequest,
  VoidPaymentResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const findPaymentById = async (id: string) => {
  const response = await callEndpoint<GetPaymentRequest, GetPaymentResponse>(
    ENDPOINT_CONFIGS.getPayment,
    { params: { transactionId: id }, next: { tags: [ROUTES.ORDERS, `payments/${id}`] } }
  );

  return response.data;
};

export const voidPayment = async (data: VoidPaymentRequest['body']) => {
  const response = await callEndpoint<VoidPaymentRequest, VoidPaymentResponse>(
    ENDPOINT_CONFIGS.voidPayment,
    { body: data }
  );

  revalidateTag(ROUTES.ORDERS);
  revalidateTag(`payments/${data.transactionId}`);

  return response;
};

export const refundPayment = async (payload: RefundPaymentRequest['body']) => {
  const response = await callEndpoint<RefundPaymentRequest, RefundPaymentResponse>(
    ENDPOINT_CONFIGS.refundPayment,
    { body: payload }
  );

  revalidateTag(ROUTES.ORDERS);
  revalidateTag(`payments/${payload.transactionId}`);

  return response;
};
