'use server';

import { callEndpoint } from '@/lib/fetch';
import type {
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersListRequest,
  GetOrdersListResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const findOrderById = async (id: string | number) => {
  noStore();

  const response = await callEndpoint<GetOrderRequest, GetOrderResponse>(
    ENDPOINT_CONFIGS.getOrder,
    { params: { orderId: Number(id) } }
  );

  return response.data;
};

export const getOrdersList = async (query: { page: number; limit: number }) => {
  noStore();

  const response = await callEndpoint<GetOrdersListRequest, GetOrdersListResponse>(
    ENDPOINT_CONFIGS.getOrdersList,
    { query }
  );

  return response.data;
};
