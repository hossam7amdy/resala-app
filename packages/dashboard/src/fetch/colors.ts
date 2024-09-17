'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/utils/routes';
import type {
  CreateColorRequest,
  CreateColorResponse,
  DeleteColorRequest,
  DeleteColorResponse,
  GetColorRequest,
  GetColorResponse,
  ListColorsRequest,
  ListColorsResponse,
  UpdateColorRequest,
  UpdateColorResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const listAllColors = async () => {
  const response = await callEndpoint<ListColorsRequest, ListColorsResponse>(
    ENDPOINT_CONFIGS.listColors,
    { query: {}, next: { tags: [ROUTES.COLORS] } }
  );

  return response.data;
};

export const findColorById = async (id: string | number) => {
  const response = await callEndpoint<GetColorRequest, GetColorResponse>(
    ENDPOINT_CONFIGS.getColor,
    { params: { colorId: id.toString() }, next: { tags: [ROUTES.COLORS] } }
  );

  return response.data;
};

export const createColor = async (data: CreateColorRequest['body']) => {
  const response = await callEndpoint<CreateColorRequest, CreateColorResponse>(
    ENDPOINT_CONFIGS.createColor,
    { body: data }
  );

  revalidateTag(ROUTES.COLORS);
  return response;
};

export const updateColor = async (id: string | number, data: UpdateColorRequest['body']) => {
  const response = await callEndpoint<UpdateColorRequest, UpdateColorResponse>(
    ENDPOINT_CONFIGS.updateColor,
    {
      body: data,
      params: { colorId: id.toString() },
    }
  );

  revalidateTag(ROUTES.COLORS);
  return response;
};

export const deleteColor = async (id: string | number) => {
  const response = await callEndpoint<DeleteColorRequest, DeleteColorResponse>(
    ENDPOINT_CONFIGS.deleteColor,
    { params: { colorId: id.toString() } }
  );

  revalidateTag(ROUTES.COLORS);
  return response;
};
