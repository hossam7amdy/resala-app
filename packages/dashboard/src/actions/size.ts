'use server';

import { callEndpoint } from '@/services/callEndpoint';
import ROUTES from '@/utils/routes';
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

export const createSize = async (data: CreateSizeRequest['body']) => {
  const response = await callEndpoint<CreateSizeRequest, CreateSizeResponse>(
    ENDPOINT_CONFIGS.createSize,
    { body: data }
  );

  revalidatePath(ROUTES.SIZES);
  return response;
};

export const updateSize = async (id: string | number, data: UpdateSizeRequest['body']) => {
  const response = await callEndpoint<UpdateSizeRequest, UpdateSizeResponse>(
    ENDPOINT_CONFIGS.updateSize,
    {
      body: data,
      params: { sizeId: Number(id) },
    }
  );

  revalidatePath(ROUTES.SIZES);
  return response;
};

export const deleteSize = async (id: string | number) => {
  await callEndpoint<DeleteSizeRequest, DeleteSizeResponse>(ENDPOINT_CONFIGS.deleteSize, {
    params: { sizeId: Number(id) },
  });

  revalidatePath(ROUTES.SIZES);
};
