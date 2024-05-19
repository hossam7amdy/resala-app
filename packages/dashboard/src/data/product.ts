'use server';

import { callEndpoint } from '@/lib/fetch';
import {
  type DefaultRequestQuery,
  ENDPOINT_CONFIGS,
  type GetProductImagesRequest,
  type GetProductImagesResponse,
  type GetProductRequest,
  type GetProductResponse,
  type GetProductStocksRequest,
  type GetProductStocksResponse,
  type GetProductsListRequest,
  type GetProductsListResponse,
} from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listProductsPaginated = async (query: DefaultRequestQuery['query']) => {
  noStore();

  const response = await callEndpoint<GetProductsListRequest, GetProductsListResponse>(
    ENDPOINT_CONFIGS.getProductsList,
    { query: { ...query, deleted: true } }
  );

  return response.data;
};

export const getProductImages = async (id: string) => {
  noStore();

  const response = await callEndpoint<GetProductImagesRequest, GetProductImagesResponse>(
    ENDPOINT_CONFIGS.listProductImages,
    { params: { productId: Number(id) } }
  );

  return response.data;
};

export const getProductStocks = async (id: string) => {
  noStore();

  const response = await callEndpoint<GetProductStocksRequest, GetProductStocksResponse>(
    ENDPOINT_CONFIGS.getProductStocks,
    { params: { productId: Number(id) } }
  );

  return response.data;
};

export const findProductById = async (id: string | number) => {
  noStore();

  const response = await callEndpoint<GetProductRequest, GetProductResponse>(
    ENDPOINT_CONFIGS.getProduct,
    { query: { deleted: true }, params: { productId: Number(id) } }
  );

  return response.data;
};
