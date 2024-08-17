'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type {
  GetStockRequest,
  GetStockResponse,
  ListStocksRequest,
  ListStocksResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listStocks = async (query: ListStocksRequest['query']) => {
  noStore();

  const response = await callEndpoint<ListStocksRequest, ListStocksResponse>(
    ENDPOINT_CONFIGS.listStocks,
    { query }
  );

  return response.data;
};

export const findStockById = async (id: string | number) => {
  noStore();

  const response = await callEndpoint<GetStockRequest, GetStockResponse>(
    ENDPOINT_CONFIGS.getStock,
    { params: { stockId: Number(id) } }
  );

  return response.data;
};
