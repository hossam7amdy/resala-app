'use server';

import { callEndpoint } from '@/fetch';
import type {
  GetSizeRequest,
  GetSizeResponse,
  ListSizesRequest,
  ListSizesResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listAllSizes = async () => {
  noStore();

  const response = await callEndpoint<ListSizesRequest, ListSizesResponse>(
    ENDPOINT_CONFIGS.listSizes
  );

  return response.data;
};

export const findSizeById = async (id: string | number) => {
  noStore();

  const response = await callEndpoint<GetSizeRequest, GetSizeResponse>(ENDPOINT_CONFIGS.getSize, {
    params: { sizeId: id.toString() },
  });

  return response.data;
};
