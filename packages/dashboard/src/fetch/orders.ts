'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/utils/routes';
import type {
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const findOrderById = async (id: string | number) => {
  const response = await callEndpoint<GetOrderRequest, GetOrderResponse>(
    ENDPOINT_CONFIGS.getOrder,
    {
      params: { orderId: id.toString() },
      next: { tags: [ROUTES.ORDERS] },
    }
  );

  return response.data;
};

export const listOrders = async (query: ListOrdersRequest['query']) => {
  const response = await callEndpoint<ListOrdersRequest, ListOrdersResponse>(
    ENDPOINT_CONFIGS.listOrders,
    {
      query,
      next: { revalidate: 30, tags: [ROUTES.ORDERS] },
    }
  );

  return response.data;
};

export const updateOrderStatus = async (
  id: string | number,
  payload: UpdateOrderRequest['body']
) => {
  const response = await callEndpoint<UpdateOrderRequest, UpdateOrderResponse>(
    ENDPOINT_CONFIGS.updateOrderStatus,
    {
      params: { orderId: id.toString() },
      body: payload,
    }
  );

  revalidateTag(ROUTES.ORDERS);
  return response;
};

export const deleteOrder = async (orderId: string | number, userId: string | number) => {
  const response = await callEndpoint<DeleteOrderRequest, DeleteOrderResponse>(
    ENDPOINT_CONFIGS.deleteOrder,
    { params: { orderId: orderId.toString() }, query: { userId: userId.toString() } }
  );

  revalidateTag(ROUTES.ORDERS);
  return response;
};
