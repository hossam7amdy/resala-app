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

export const getOverview = async (): Promise<GetDashboardOverviewResponse['data']> => {
  return await dashboardService.getOverview();
};

export const getSalesTrends = async (): Promise<GetSalesTrendsResponse['data']> => {
  return await dashboardService.getSalesTrend();
};

export const getInventoryStatus = async (): Promise<GetInventoryStatusResponse['data']> => {
  return await dashboardService.getInventoryStatus();
};

export const getOrdersStatus = async (): Promise<GetOrdersStatusResponse['data']> => {
  return await dashboardService.getOrderStatus();
};

export const listTopProducts = async (): Promise<ListTopProductsResponse['data']> => {
  return await dashboardService.listTopProducts();
};

export const listTopCustomers = async (): Promise<ListTopCustomersResponse['data']> => {
  return await dashboardService.listTopCustomers();
};

export const listCustomersFeedback = async (): Promise<ListCustomersFeedbackResponse['data']> => {
  return await dashboardService.listCustomersFeedback();
};
