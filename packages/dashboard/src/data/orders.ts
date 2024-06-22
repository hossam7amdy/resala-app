'use server';

import { callEndpoint } from '@/lib/fetch';
import type {
  AdminGetOrdersListRequest,
  AdminGetOrdersListResponse,
  GetOrderRequest,
  GetOrderResponse,
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

export const listOrders = async (query: { page: number; limit: number; query: string }) => {
  noStore();

  const response = await callEndpoint<AdminGetOrdersListRequest, AdminGetOrdersListResponse>(
    ENDPOINT_CONFIGS.adminListOrders,
    { query }
  );

  return response.data;
};
