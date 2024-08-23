'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type {
  GetProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listProducts = async (query: ListProductsRequest['query']) => {
  noStore();

  const response = await callEndpoint<ListProductsRequest, ListProductsResponse>(
    ENDPOINT_CONFIGS.listProducts,
    { query }
  );

  return response.data;
};

export const findProduct = async (id: string | number) => {
  noStore();

  try {
    const response = await callEndpoint<GetProductRequest, GetProductResponse>(
      ENDPOINT_CONFIGS.getProduct,
      { params: { productId: id.toString() } }
    );

    return response.data;
  } catch (e) {
    return null;
  }
};
