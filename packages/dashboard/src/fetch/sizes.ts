'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/utils/routes';
import type {
  CreateSizeRequest,
  CreateSizeResponse,
  DeleteSizeRequest,
  DeleteSizeResponse,
  GetSizeRequest,
  GetSizeResponse,
  ListSizesRequest,
  ListSizesResponse,
  UpdateSizeRequest,
  UpdateSizeResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const listAllSizes = async () => {
  const response = await callEndpoint<ListSizesRequest, ListSizesResponse>(
    ENDPOINT_CONFIGS.listSizes,
    { query: {}, next: { tags: [ROUTES.SIZES] } }
  );

  return response.data;
};

export const findSizeById = async (id: string | number) => {
  const response = await callEndpoint<GetSizeRequest, GetSizeResponse>(ENDPOINT_CONFIGS.getSize, {
    params: { sizeId: id.toString() },
    cache: 'no-store',
  });

  return response.data;
};

export const createSize = async (data: CreateSizeRequest['body']) => {
  const response = await callEndpoint<CreateSizeRequest, CreateSizeResponse>(
    ENDPOINT_CONFIGS.createSize,
    { body: data }
  );

  revalidateTag(ROUTES.SIZES);
  return response;
};

export const updateSize = async (id: string | number, data: UpdateSizeRequest['body']) => {
  const response = await callEndpoint<UpdateSizeRequest, UpdateSizeResponse>(
    ENDPOINT_CONFIGS.updateSize,
    {
      body: data,
      params: { sizeId: id.toString() },
    }
  );

  revalidateTag(ROUTES.SIZES);
  return response;
};

export const deleteSize = async (id: string | number) => {
  const response = await callEndpoint<DeleteSizeRequest, DeleteSizeResponse>(
    ENDPOINT_CONFIGS.deleteSize,
    { params: { sizeId: id.toString() } }
  );

  revalidateTag(ROUTES.SIZES);

  return response;
};
