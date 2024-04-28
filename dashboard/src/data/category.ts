import { callEndpoint } from '@/lib/fetch';
import {
  ENDPOINT_CONFIGS,
  type GetCategoriesListRequest,
  type GetCategoriesListResponse,
  type GetCategoryResponse,
  withParams,
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
  try {
    const response = await callEndpoint<undefined, GetCategoryResponse>(
      withParams(ENDPOINT_CONFIGS.getCategory, id)
    );
    return response.data;
  } catch (e) {
    return undefined;
  }
};
