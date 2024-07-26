'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryRequest,
  DeleteCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const createCategory = async (payload: CreateCategoryRequest['body']) => {
  const response = await callEndpoint<CreateCategoryRequest, CreateCategoryResponse>(
    ENDPOINT_CONFIGS.createCategory,
    { body: payload }
  );

  revalidatePath(ROUTES.CATEGORIES);
  return response;
};

export const updateCategory = async (id: string, payload: UpdateCategoryRequest['body']) => {
  const response = await callEndpoint<UpdateCategoryRequest, UpdateCategoryResponse>(
    ENDPOINT_CONFIGS.updateCategory,
    { params: { categoryId: Number(id) }, body: payload }
  );

  revalidatePath(ROUTES.CATEGORIES);
  return response;
};

export const deleteCategory = async (id: string) => {
  await callEndpoint<DeleteCategoryRequest, DeleteCategoryResponse>(
    ENDPOINT_CONFIGS.deleteCategory,
    { params: { categoryId: Number(id) } }
  );

  revalidatePath(ROUTES.CATEGORIES);
};
