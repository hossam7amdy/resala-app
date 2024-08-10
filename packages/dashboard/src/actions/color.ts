'use server';

import { callEndpoint } from '@/services/callEndpoint';
import ROUTES from '@/utils/routes';
import type {
  CreateColorRequest,
  CreateColorResponse,
  DeleteColorRequest,
  DeleteColorResponse,
  UpdateColorRequest,
  UpdateColorResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createColor = async (data: CreateColorRequest['body']) => {
  const response = await callEndpoint<CreateColorRequest, CreateColorResponse>(
    ENDPOINT_CONFIGS.createColor,
    { body: data }
  );

  revalidatePath(ROUTES.COLORS);
  return response;
};

export const updateColor = async (id: string | number, data: UpdateColorRequest['body']) => {
  await callEndpoint<UpdateColorRequest, UpdateColorResponse>(ENDPOINT_CONFIGS.updateColor, {
    body: data,
    params: { colorId: Number(id) },
  });

  revalidatePath(ROUTES.COLORS);

  redirect(ROUTES.EDIT_COLOR(id));
};

export const deleteColor = async (id: string | number) => {
  await callEndpoint<DeleteColorRequest, DeleteColorResponse>(ENDPOINT_CONFIGS.deleteColor, {
    params: { colorId: Number(id) },
  });

  revalidatePath(ROUTES.COLORS);
};
