import { callEndpoint } from '@/lib/fetch';
import {
  ENDPOINT_CONFIGS,
  type GetCategoriesListRequest,
  type GetCategoriesListResponse,
  type GetCategoryRequest,
  type GetCategoryResponse,
} from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listAllCategories = async () => {
  noStore();

  const response = await callEndpoint<GetCategoriesListRequest, GetCategoriesListResponse>(
    ENDPOINT_CONFIGS.listCategories,
    { query: { deleted: true } }
  );

  return response.data;
};

export const findCategoryById = async (id: string) => {
  noStore();

  const response = await callEndpoint<GetCategoryRequest, GetCategoryResponse>(
    ENDPOINT_CONFIGS.getCategory,
    { params: { categoryId: Number(id) }, query: { deleted: true } }
  );

  return response.data;
};
