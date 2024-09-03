'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type {
  GetDashboardOverviewRequest,
  GetDashboardOverviewResponse,
  GetInventoryStatusRequest,
  GetInventoryStatusResponse,
  GetOrdersStatusRequest,
  GetOrdersStatusResponse,
  GetSalesTrendsRequest,
  GetSalesTrendsResponse,
  ListCustomersFeedbackRequest,
  ListCustomersFeedbackResponse,
  ListTopCustomersRequest,
  ListTopCustomersResponse,
  ListTopProductsRequest,
  ListTopProductsResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const getOverview = async () => {
  noStore();

  const response = await callEndpoint<GetDashboardOverviewRequest, GetDashboardOverviewResponse>(
    ENDPOINT_CONFIGS.getDashboardOverview
  );

  return response.data;
};

export const getSalesTrends = async () => {
  noStore();

  const response = await callEndpoint<GetSalesTrendsRequest, GetSalesTrendsResponse>(
    ENDPOINT_CONFIGS.getSalesTrends
  );

  return response.data;
};

export const getInventoryStatus = async () => {
  noStore();

  const response = await callEndpoint<GetInventoryStatusRequest, GetInventoryStatusResponse>(
    ENDPOINT_CONFIGS.getInventoryStatus
  );

  return response.data;
};

export const getOrdersStatus = async () => {
  noStore();

  const response = await callEndpoint<GetOrdersStatusRequest, GetOrdersStatusResponse>(
    ENDPOINT_CONFIGS.getOrdersStatus
  );

  return response.data;
};

export const listTopProducts = async () => {
  noStore();

  const response = await callEndpoint<ListTopProductsRequest, ListTopProductsResponse>(
    ENDPOINT_CONFIGS.listTopProducts
  );

  return response.data;
};

export const listTopCustomers = async () => {
  noStore();

  const response = await callEndpoint<ListTopCustomersRequest, ListTopCustomersResponse>(
    ENDPOINT_CONFIGS.listTopCustomers
  );

  return response.data;
};

export const listCustomersFeedback = async () => {
  noStore();

  const response = await callEndpoint<ListCustomersFeedbackRequest, ListCustomersFeedbackResponse>(
    ENDPOINT_CONFIGS.listCustomersFeedback
  );

  return response.data;
};
