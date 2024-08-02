'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type { FindImagesRequest, FindImagesResponse } from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listImages = async (productId: number, colorId: number) => {
  noStore();

  const response = await callEndpoint<FindImagesRequest, FindImagesResponse>(
    ENDPOINT_CONFIGS.findImages,
    { query: { productId, colorId } }
  );

  return response.data;
};
