import { callEndpoint } from '@/lib/fetch';
import {
  DefaultRequestQuery,
  ENDPOINT_CONFIGS,
  type GetProductsListRequest,
  type GetProductsListResponse,
} from '@resala/shared';

export const listProductsPaginated = async (query: DefaultRequestQuery['query']) => {
  const response = await callEndpoint<GetProductsListRequest, GetProductsListResponse>(
    ENDPOINT_CONFIGS.getProductsList,
    { query: query }
  );

  return response.data;
};
