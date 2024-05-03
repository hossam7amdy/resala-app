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
}: Pick<DefaultRequestQuery['query'], 'page' | 'limit'>) => {
  noStore();

  const response = await callEndpoint<GetStocksListRequest, GetStocksListResponse>(
    ENDPOINT_CONFIGS.getStocksList,
    { query: { page: Number(page), limit: Number(limit) } }
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
