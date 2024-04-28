import { callEndpoint } from '@/lib/fetch';
import {
  type DefaultRequestQuery,
  ENDPOINT_CONFIGS,
  type GetProductImagesResponse,
  type GetProductStocksResponse,
  type GetProductsListRequest,
  type GetProductsListResponse,
  withParams,
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

  try {
    const response = await callEndpoint<undefined, GetProductImagesResponse>(
      withParams(ENDPOINT_CONFIGS.listProductImages, id)
    );

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getProductStocks = async (id: string) => {
  noStore();

  try {
    const response = await callEndpoint<undefined, GetProductStocksResponse>(
      withParams(ENDPOINT_CONFIGS.getProductStocks, id)
    );

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
