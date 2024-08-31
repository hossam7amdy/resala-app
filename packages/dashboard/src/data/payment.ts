'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type { GetPaymentRequest, GetPaymentResponse } from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const findPaymentById = async (id: string) => {
  noStore();

  const response = await callEndpoint<GetPaymentRequest, GetPaymentResponse>(
    ENDPOINT_CONFIGS.getPayment,
    { params: { transactionId: id } }
  );

  return response.data;
};
