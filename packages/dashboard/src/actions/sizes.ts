'use server';

import { ROUTES } from '@/routes';
import { sizeService } from '@/services';
import { formatError } from '@/utils/formatError';
import type {
  CreateSizeRequest,
  GetSizeResponse,
  ListSizesResponse,
  UpdateSizeRequest,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const listAllSizes = async (): Promise<ListSizesResponse['data']> => {
  return await sizeService.list();
};

export const findSizeById = async (id: string): Promise<GetSizeResponse['data']> => {
  try {
    return await sizeService.find(id);
  } catch {
    return notFound();
  }
};

export const createSize = async (payload: CreateSizeRequest['body']) => {
  try {
    const data = await sizeService.create(payload);

    revalidatePath(ROUTES.SIZES);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const updateSize = async (id: string, payload: UpdateSizeRequest['body']) => {
  try {
    const data = await sizeService.update(id, payload);
    revalidatePath(ROUTES.SIZES);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const deleteSize = async (id: string) => {
  try {
    const data = await sizeService.delete(id);
    revalidatePath(ROUTES.SIZES);

    return { data };
  } catch (e) {
    return formatError(e);
  }
};
