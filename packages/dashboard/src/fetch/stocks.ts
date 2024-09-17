'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/utils/routes';
import type {
  CreateStockRequest,
  CreateStockResponse,
  DeleteStockRequest,
  DeleteStockResponse,
  GetStockRequest,
  GetStockResponse,
  ListStocksRequest,
  ListStocksResponse,
  UpdateStockRequest,
  UpdateStockResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const listStocks = async (query: ListStocksRequest['query']) => {
  const response = await callEndpoint<ListStocksRequest, ListStocksResponse>(
    ENDPOINT_CONFIGS.listStocks,
    { query, next: { tags: [ROUTES.STOCKS] } }
  );

  return response.data;
};

export const findStockById = async (id: string | number) => {
  const response = await callEndpoint<GetStockRequest, GetStockResponse>(
    ENDPOINT_CONFIGS.getStock,
    { params: { stockId: id.toString() }, cache: 'no-store' }
  );

  return response.data;
};

export const createStock = async (stock: CreateStockRequest['body']) => {
  const response = await callEndpoint<CreateStockRequest, CreateStockResponse>(
    ENDPOINT_CONFIGS.addStock,
    { body: stock }
  );

  revalidateTag(ROUTES.STOCKS);
  revalidateTag(ROUTES.PRODUCT_STOCKS(stock.productId));
  return response;
};

export const updateStock = async (stockId: string | number, stock: UpdateStockRequest['body']) => {
  const response = await callEndpoint<UpdateStockRequest, UpdateStockResponse>(
    ENDPOINT_CONFIGS.updateStock,
    { params: { stockId: stockId.toString() }, body: stock }
  );

  revalidateTag(ROUTES.STOCKS);
  revalidateTag(ROUTES.PRODUCT_STOCKS(stock.productId));
  return response;
};

export const deleteStock = async (stockId: string | number) => {
  const response = await callEndpoint<DeleteStockRequest, DeleteStockResponse>(
    ENDPOINT_CONFIGS.deleteStock,
    { params: { stockId: stockId.toString() } }
  );

  revalidateTag(ROUTES.STOCKS);

  return response;
};
