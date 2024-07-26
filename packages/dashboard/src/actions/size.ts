'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import type {
  CreateSizeRequest,
  CreateSizeResponse,
  DeleteSizeRequest,
  DeleteSizeResponse,
  UpdateSizeRequest,
  UpdateSizeResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createSize = async (data: CreateSizeRequest['body']) => {
  const response = await callEndpoint<CreateSizeRequest, CreateSizeResponse>(
    ENDPOINT_CONFIGS.createSize,
    { body: data }
  );

  revalidatePath(ROUTES.SIZES);
  return response;
};

export const updateSize = async (id: string | number, data: UpdateSizeRequest['body']) => {
  await callEndpoint<UpdateSizeRequest, UpdateSizeResponse>(ENDPOINT_CONFIGS.updateSize, {
    body: data,
    params: { sizeId: Number(id) },
  });

  revalidatePath(ROUTES.SIZES);

  redirect(ROUTES.EDIT_SIZE(id));
};

export const deleteSize = async (id: string | number) => {
  await callEndpoint<DeleteSizeRequest, DeleteSizeResponse>(ENDPOINT_CONFIGS.deleteSize, {
    params: { sizeId: Number(id) },
  });

  revalidatePath(ROUTES.SIZES);
};
