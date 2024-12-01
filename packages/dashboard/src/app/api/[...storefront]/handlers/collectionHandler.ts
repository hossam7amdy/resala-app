import { categoryService } from '@/services';
import { type GetCategoryResponse, type ListCategoriesResponse } from '@resala/shared';
import type { Context } from 'hono';
import type { HandlerResponse } from 'hono/types';

export const get = async (c: Context): Promise<HandlerResponse<GetCategoryResponse>> => {
  const categoryId = c.req.param('categoryId') as string;
  const category = await categoryService.find(+categoryId);

  return c.json({ success: true, data: category });
};

export const list = async (c: Context): Promise<HandlerResponse<ListCategoriesResponse>> => {
  const categories = await categoryService.list();

  return c.json({ success: true, data: categories });
};
