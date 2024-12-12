'use server';

import { ROUTES } from '@/routes';
import { colorService } from '@/services';
import type {
  CreateColorRequest,
  CreateColorResponse,
  DeleteColorResponse,
  GetColorResponse,
  ListColorsResponse,
  UpdateColorRequest,
  UpdateColorResponse,
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

export const createColor = async (
  payload: CreateColorRequest['body']
): Promise<CreateColorResponse> => {
  try {
    const data = await colorService.create(payload);
    revalidateTag(ROUTES.COLORS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as CreateColorResponse;
  }
};

export const updateColor = async (
  id: string,
  payload: UpdateColorRequest['body']
): Promise<UpdateColorResponse> => {
  try {
    const data = await colorService.update(id, payload);

    revalidateTag(ROUTES.COLORS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as UpdateColorResponse;
  }
};

export const deleteColor = async (id: string) => {
  try {
    const data = await colorService.delete(id);

    revalidateTag(ROUTES.COLORS);
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as DeleteColorResponse;
  }
};
