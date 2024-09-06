'use server';

import { callEndpoint } from '@/fetch';
import type { ListImagesRequest, ListImagesResponse } from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listImages = async (productId: number, colorId: number) => {
  noStore();

  const response = await callEndpoint<ListImagesRequest, ListImagesResponse>(
    ENDPOINT_CONFIGS.findImages,
    { query: { productId, colorId } }
  );

  return response.data;
};
