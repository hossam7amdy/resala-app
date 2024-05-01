'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import {
  type CreateCategoryRequest,
  type CreateCategoryResponse,
  type DeleteCategoryRequest,
  type DeleteCategoryResponse,
  ENDPOINT_CONFIGS,
  type UpdateCategoryRequest,
  type UpdateCategoryResponse,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createCategory = async (payload: CreateCategoryRequest['body']) => {
  try {
    await callEndpoint<CreateCategoryRequest, CreateCategoryResponse>(
      ENDPOINT_CONFIGS.createCategory,
      { body: payload }
    );
  } catch (e) {
    return { message: (e as Error).message || 'Something went wrong' };
  }

  revalidatePath(ROUTES.CATEGORIES);
};

export const updateCategory = async (id: string, payload: UpdateCategoryRequest['body']) => {
  try {
    await callEndpoint<UpdateCategoryRequest, UpdateCategoryResponse>(
      ENDPOINT_CONFIGS.updateCategory,
      { params: { categoryId: Number(id) }, body: payload }
    );
  } catch (e) {
    return { message: (e as Error).message || 'Something went wrong' };
  }

  revalidatePath(ROUTES.CATEGORIES);
  redirect(ROUTES.CATEGORIES);
};

export const deleteCategory = async (id: string) => {
  try {
    await callEndpoint<DeleteCategoryRequest, DeleteCategoryResponse>(
      ENDPOINT_CONFIGS.deleteCategory,
      { params: { categoryId: Number(id) } }
    );
  } catch (e) {
    return { message: (e as Error).message || 'Something went wrong' };
  }

  revalidatePath(ROUTES.CATEGORIES);
};
