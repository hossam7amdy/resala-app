'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type {
  DefaultRequestQuery,
  GetProductRequest,
  GetProductResponse,
  GetProductStocksRequest,
  GetProductStocksResponse,
  GetProductsListRequest,
  GetProductsListResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listProducts = async (query: DefaultRequestQuery['query']) => {
  noStore();

  const response = await callEndpoint<GetProductsListRequest, GetProductsListResponse>(
    ENDPOINT_CONFIGS.listProducts,
    { query }
  );

  return response.data;
};

export const listProductStocks = async (id: string) => {
  noStore();

  try {
    const response = await callEndpoint<GetProductStocksRequest, GetProductStocksResponse>(
      ENDPOINT_CONFIGS.listProductStocks,
      { params: { productId: Number(id) } }
    );

    return response.data;
  } catch (e) {
    return null;
  }
};

export const findProduct = async (id: string | number) => {
  noStore();

  try {
    const response = await callEndpoint<GetProductRequest, GetProductResponse>(
      ENDPOINT_CONFIGS.getProduct,
      { params: { productId: Number(id) } }
    );

    return response.data;
  } catch (e) {
    return null;
  }
};
