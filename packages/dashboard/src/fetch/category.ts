'use server';

import { ROUTES } from '@/routes';
import { categoryService } from '@/services';
import type {
  CreateCategoryRequest,
  GetCategoryResponse,
  ListCategoriesResponse,
  UpdateCategoryRequest,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const listAllCategories = async (): Promise<ListCategoriesResponse['data']> => {
  return await categoryService.list();
};

export const findCategoryById = async (id: string): Promise<GetCategoryResponse['data']> => {
  try {
    return await categoryService.find(+id);
  } catch {
    notFound();
  }
};

export const createCategory = async (payload: CreateCategoryRequest['body']) => {
  try {
    const data = await categoryService.create(payload);
    revalidatePath(ROUTES.CATEGORIES);
    return { data };
  } catch (e) {
    return { error: (e as Error).message };
  }
};

export const updateCategory = async (id: string, payload: UpdateCategoryRequest['body']) => {
  try {
    const data = await categoryService.update(+id, payload);
    revalidatePath(ROUTES.CATEGORIES);
    return { data };
  } catch (e) {
    return { error: (e as Error).message };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const data = await categoryService.delete(+id);
    revalidatePath(ROUTES.CATEGORIES);
    return { data };
  } catch (e) {
    return { error: (e as Error).message };
  }
};
