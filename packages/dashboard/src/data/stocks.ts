'use server';

import { callEndpoint } from '@/lib/fetch';
import type {
  DefaultRequestQuery,
  GetStockRequest,
  GetStockResponse,
  GetStocksListRequest,
  GetStocksListResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listStocksPaginated = async ({
  page,
  limit,
  query,
}: Pick<DefaultRequestQuery['query'], 'page' | 'limit' | 'query'>) => {
  noStore();

  const response = await callEndpoint<GetStocksListRequest, GetStocksListResponse>(
    ENDPOINT_CONFIGS.listStocks,
    { query: { page: Number(page), limit: Number(limit), query } }
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
