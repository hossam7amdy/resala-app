'use server';

import { dashboardService } from '@/services';
import type {
  GetDashboardOverviewResponse,
  GetInventoryStatusResponse,
  GetOrdersStatusResponse,
  GetSalesTrendsResponse,
  ListCustomersFeedbackResponse,
  ListTopCustomersResponse,
  ListTopProductsResponse,
} from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const getOverview = async (): Promise<GetDashboardOverviewResponse['data']> => {
  noStore();
  return await dashboardService.getOverview();
};

export const getSalesTrends = async (): Promise<GetSalesTrendsResponse['data']> => {
  noStore();
  return await dashboardService.getSalesTrend();
};

export const getInventoryStatus = async (): Promise<GetInventoryStatusResponse['data']> => {
  noStore();
  return await dashboardService.getInventoryStatus();
};

export const getOrdersStatus = async (): Promise<GetOrdersStatusResponse['data']> => {
  noStore();
  return await dashboardService.getOrderStatus();
};

export const listTopProducts = async (): Promise<ListTopProductsResponse['data']> => {
  noStore();
  return await dashboardService.listTopProducts();
};

export const listTopCustomers = async (): Promise<ListTopCustomersResponse['data']> => {
  noStore();
  return await dashboardService.listTopCustomers();
};

export const listCustomersFeedback = async (): Promise<ListCustomersFeedbackResponse['data']> => {
  noStore();
  return await dashboardService.listCustomersFeedback();
};
