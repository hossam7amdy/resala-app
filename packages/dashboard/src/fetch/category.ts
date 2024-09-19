'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/routes';
import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryRequest,
  DeleteCategoryResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  ListCategoriesRequest,
  ListCategoriesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const listAllCategories = async () => {
  const response = await callEndpoint<ListCategoriesRequest, ListCategoriesResponse>(
    ENDPOINT_CONFIGS.listCategories,
    { query: {}, next: { tags: [ROUTES.CATEGORIES] } }
  );

  return response.data;
};

export const findCategoryById = async (id: string) => {
  const response = await callEndpoint<GetCategoryRequest, GetCategoryResponse>(
    ENDPOINT_CONFIGS.getCategory,
    { params: { categoryId: id.toString() }, next: { tags: [ROUTES.CATEGORIES] } }
  );

  return response.data;
};

export const createCategory = async (payload: CreateCategoryRequest['body']) => {
  const response = await callEndpoint<CreateCategoryRequest, CreateCategoryResponse>(
    ENDPOINT_CONFIGS.createCategory,
    { body: payload }
  );

  revalidateTag(ROUTES.CATEGORIES);
  return response;
};

export const updateCategory = async (id: string, payload: UpdateCategoryRequest['body']) => {
  const response = await callEndpoint<UpdateCategoryRequest, UpdateCategoryResponse>(
    ENDPOINT_CONFIGS.updateCategory,
    { params: { categoryId: id }, body: payload }
  );

  revalidateTag(ROUTES.CATEGORIES);
  return response;
};

export const deleteCategory = async (id: string) => {
  const response = await callEndpoint<DeleteCategoryRequest, DeleteCategoryResponse>(
    ENDPOINT_CONFIGS.deleteCategory,
    { params: { categoryId: id } }
  );

  revalidateTag(ROUTES.CATEGORIES);
  return response;
};
