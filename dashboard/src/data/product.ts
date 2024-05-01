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

  try {
    const response = await callEndpoint<GetProductImagesRequest, GetProductImagesResponse>(
      ENDPOINT_CONFIGS.listProductImages,
      { params: { productId: Number(id) } }
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
    const response = await callEndpoint<GetProductStocksRequest, GetProductStocksResponse>(
      ENDPOINT_CONFIGS.getProductStocks,
      { params: { productId: Number(id) } }
    );

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const findProductById = async (id: string | number) => {
  noStore();

  try {
    const response = await callEndpoint<GetProductRequest, GetProductResponse>(
      ENDPOINT_CONFIGS.getProduct,
      { query: { deleted: true }, params: { productId: Number(id) } }
    );

    return response.data;
  } catch (e) {
    const error = e as GetProductResponse;
    if (error.message) {
      throw new Error(error.message);
    }
    console.error(e);
    throw new Error('Something went wrong. Try again!');
  }
};
