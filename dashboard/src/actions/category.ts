'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import {
  type CreateCategoryRequest,
  type CreateCategoryResponse,
  type DeleteCategoryResponse,
  ENDPOINT_CONFIGS,
  type UpdateCategoryRequest,
  type UpdateCategoryResponse,
  withParams,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createCategory = async (
  payload: CreateCategoryRequest['body']
): Promise<CreateCategoryResponse> => {
  try {
    const response = await callEndpoint<CreateCategoryRequest, CreateCategoryResponse>(
      ENDPOINT_CONFIGS.createCategory,
      { body: payload }
    );

    revalidatePath(ROUTES.CATEGORIES);
    return response;
  } catch (error) {
    return error as CreateCategoryResponse;
  }
};

export const updateCategory = async (id: string, payload: UpdateCategoryRequest['body']) => {
  try {
    await callEndpoint<Omit<UpdateCategoryRequest, 'params'>, UpdateCategoryResponse>(
      withParams(ENDPOINT_CONFIGS.updateCategory, id),
      { body: payload }
    );
  } catch (error) {
    return error as CreateCategoryResponse;
  }

  revalidatePath(ROUTES.CATEGORIES);
  redirect(ROUTES.CATEGORIES);
};

export const deleteCategory = async (id: string) => {
  try {
    await callEndpoint<undefined, DeleteCategoryResponse>(
      withParams(ENDPOINT_CONFIGS.deleteCategory, id)
    );
  } catch (error) {
    return error as CreateCategoryResponse;
  }

  revalidatePath(ROUTES.CATEGORIES);
};
