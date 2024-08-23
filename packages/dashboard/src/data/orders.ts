'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type {
  GetOrderRequest,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const findOrderById = async (id: string | number) => {
  noStore();

  const response = await callEndpoint<GetOrderRequest, GetOrderResponse>(
    ENDPOINT_CONFIGS.getOrder,
    { params: { orderId: id.toString() } }
  );

  return response.data;
};

export const listOrders = async (query: { page: number; limit: number; query: string }) => {
  noStore();

  const response = await callEndpoint<ListOrdersRequest, ListOrdersResponse>(
    ENDPOINT_CONFIGS.listOrders,
    { query }
  );

  return response.data;
};
