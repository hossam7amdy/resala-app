'use server';

import { ROUTES } from '@/routes';
import { sizeService } from '@/services';
import type {
  CreateSizeRequest,
  CreateSizeResponse,
  DeleteSizeResponse,
  GetSizeResponse,
  ListSizesResponse,
  UpdateSizeRequest,
  UpdateSizeResponse,
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

export const createSize = async (
  payload: CreateSizeRequest['body']
): Promise<CreateSizeResponse> => {
  try {
    const data = await sizeService.create(payload);

    revalidatePath(ROUTES.SIZES);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as CreateSizeResponse;
  }
};

export const updateSize = async (
  id: string,
  payload: UpdateSizeRequest['body']
): Promise<UpdateSizeResponse> => {
  try {
    const data = await sizeService.update(id, payload);
    revalidatePath(ROUTES.SIZES);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as UpdateSizeResponse;
  }
};

export const deleteSize = async (id: string): Promise<DeleteSizeResponse> => {
  try {
    const data = await sizeService.delete(id);
    revalidatePath(ROUTES.SIZES);

    return { data };
  } catch (e) {
    return { error: (e as Error).message } as DeleteSizeResponse;
  }
};
