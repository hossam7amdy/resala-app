'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type {
  GetColorRequest,
  GetColorResponse,
  ListColorsRequest,
  ListColorsResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listAllColors = async () => {
  noStore();

  const response = await callEndpoint<ListColorsRequest, ListColorsResponse>(
    ENDPOINT_CONFIGS.listColors
  );

  return response.data;
};

export const findColorById = async (id: string | number) => {
  noStore();

  const response = await callEndpoint<GetColorRequest, GetColorResponse>(
    ENDPOINT_CONFIGS.getColor,
    { params: { colorId: Number(id) } }
  );

  return response.data;
};
