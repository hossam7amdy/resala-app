'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type {
  GetSizeRequest,
  GetSizeResponse,
  GetSizesListRequest,
  GetSizesListResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listAllSizes = async () => {
  noStore();

  const response = await callEndpoint<GetSizesListRequest, GetSizesListResponse>(
    ENDPOINT_CONFIGS.listSizes
  );

  return response.data;
};

export const findSizeById = async (id: string | number) => {
  noStore();

  const response = await callEndpoint<GetSizeRequest, GetSizeResponse>(ENDPOINT_CONFIGS.getSize, {
    params: { sizeId: Number(id) },
  });

  return response.data;
};
