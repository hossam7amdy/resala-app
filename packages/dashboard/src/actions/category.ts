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
import { redirect } from 'next/navigation';

export const createCategory = async (payload: CreateCategoryRequest['body']) => {
  try {
    const response = await callEndpoint<CreateCategoryRequest, CreateCategoryResponse>(
      ENDPOINT_CONFIGS.createCategory,
      { body: payload }
    );

    revalidatePath(ROUTES.CATEGORIES);
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }
};

export const updateCategory = async (id: string, payload: UpdateCategoryRequest['body']) => {
  try {
    await callEndpoint<UpdateCategoryRequest, UpdateCategoryResponse>(
      ENDPOINT_CONFIGS.updateCategory,
      { params: { categoryId: Number(id) }, body: payload }
    );
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }

  revalidatePath(ROUTES.CATEGORIES);
  redirect(ROUTES.CATEGORIES);
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await callEndpoint<DeleteCategoryRequest, DeleteCategoryResponse>(
      ENDPOINT_CONFIGS.deleteCategory,
      { params: { categoryId: Number(id) } }
    );

    revalidatePath(ROUTES.CATEGORIES);
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      message: error.message,
      success: false,
    };
  }
};
