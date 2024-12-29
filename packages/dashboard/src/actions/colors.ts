'use server';

import { ROUTES } from '@/routes';
import { colorService } from '@/services';
import { formatError } from '@/utils/formatError';
import type {
  CreateColorRequest,
  GetColorResponse,
  ListColorsResponse,
  UpdateColorRequest,
} from '@resala/shared';
import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

export const listAllColors = async (): Promise<ListColorsResponse['data']> => {
  return await colorService.list();
};

export const findColorById = async (id: string): Promise<GetColorResponse['data']> => {
  try {
    return await colorService.find(id);
  } catch {
    notFound();
  }
};

export const createColor = async (payload: CreateColorRequest['body']) => {
  try {
    const data = await colorService.create(payload);
    revalidateTag(ROUTES.COLORS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const updateColor = async (id: string, payload: UpdateColorRequest['body']) => {
  try {
    const data = await colorService.update(id, payload);

    revalidateTag(ROUTES.COLORS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const deleteColor = async (id: string) => {
  try {
    const data = await colorService.delete(id);

    revalidateTag(ROUTES.COLORS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};
