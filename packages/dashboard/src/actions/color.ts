'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
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
  try {
    const response = await callEndpoint<CreateColorRequest, CreateColorResponse>(
      ENDPOINT_CONFIGS.createColor,
      { body: data }
    );

    revalidatePath(ROUTES.COLORS);
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateColor = async (id: string | number, data: UpdateColorRequest['body']) => {
  try {
    await callEndpoint<UpdateColorRequest, UpdateColorResponse>(ENDPOINT_CONFIGS.updateColor, {
      body: data,
      params: { colorId: Number(id) },
    });

    revalidatePath(ROUTES.COLORS);
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }

  redirect(ROUTES.EDIT_COLOR(id));
};

export const deleteColor = async (id: string | number) => {
  try {
    const response = await callEndpoint<DeleteColorRequest, DeleteColorResponse>(
      ENDPOINT_CONFIGS.deleteColor,
      { params: { colorId: Number(id) } }
    );

    revalidatePath(ROUTES.COLORS);
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};
