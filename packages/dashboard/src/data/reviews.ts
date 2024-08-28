'use server';

import { callEndpoint } from '@/services/callEndpoint';
import type {
  GetReviewRequest,
  GetReviewResponse,
  ListReviewsRequest,
  ListReviewsResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const listReviews = async (query: ListReviewsRequest['query']) => {
  noStore();

  const response = await callEndpoint<ListReviewsRequest, ListReviewsResponse>(
    ENDPOINT_CONFIGS.listReviews,
    { query }
  );

  return response.data;
};

export const findReviewById = async (id: string | number) => {
  noStore();

  const response = await callEndpoint<GetReviewRequest, GetReviewResponse>(
    ENDPOINT_CONFIGS.getStock,
    { params: { reviewId: id.toString() } }
  );

  return response.data;
};
