'use server';

import { callEndpoint } from '@/lib/fetch';
import type {
  GetCategoryRequest,
  GetCategoryResponse,
  ListCategoriesRequest,
  ListCategoriesResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listAllCategories = async () => {
  noStore();

  const response = await callEndpoint<ListCategoriesRequest, ListCategoriesResponse>(
    ENDPOINT_CONFIGS.listCategories
  );

  return response.data;
};

export const findCategoryById = async (id: string) => {
  noStore();

  const response = await callEndpoint<GetCategoryRequest, GetCategoryResponse>(
    ENDPOINT_CONFIGS.getCategory,
    { params: { categoryId: Number(id) } }
  );

  return response.data;
};
