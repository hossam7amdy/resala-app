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
  try {
    const response = await callEndpoint<CreateSizeRequest, CreateSizeResponse>(
      ENDPOINT_CONFIGS.createSize,
      { body: data }
    );

    revalidatePath(ROUTES.SIZES);
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateSize = async (id: string | number, data: UpdateSizeRequest['body']) => {
  try {
    await callEndpoint<UpdateSizeRequest, UpdateSizeResponse>(ENDPOINT_CONFIGS.updateSize, {
      body: data,
      params: { sizeId: Number(id) },
    });

    revalidatePath(ROUTES.SIZES);
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }

  redirect(ROUTES.EDIT_SIZE(id));
};

export const deleteSize = async (id: string | number) => {
  try {
    const response = await callEndpoint<DeleteSizeRequest, DeleteSizeResponse>(
      ENDPOINT_CONFIGS.deleteSize,
      { params: { sizeId: Number(id) } }
    );

    revalidatePath(ROUTES.SIZES);
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};
