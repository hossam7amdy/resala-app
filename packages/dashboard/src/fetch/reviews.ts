'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/routes';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type {
  DeleteReviewRequest,
  DeleteReviewResponse,
  GetReviewRequest,
  GetReviewResponse,
  ListReviewsRequest,
  ListReviewsResponse,
} from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const listReviews = async (query: ListReviewsRequest['query']) => {
  const response = await callEndpoint<ListReviewsRequest, ListReviewsResponse>(
    ENDPOINT_CONFIGS.listReviews,
    { query, next: { tags: [ROUTES.PRODUCT_REVIEWS(query.productId ?? '')] } }
  );

  return response.data;
};

export const findReviewById = async (id: string | number) => {
  const response = await callEndpoint<GetReviewRequest, GetReviewResponse>(
    ENDPOINT_CONFIGS.getStock,
    { params: { reviewId: id.toString() } }
  );

  return response.data;
};

export const deleteReview = async (id: number, userId: number) => {
  const response = await callEndpoint<DeleteReviewRequest, DeleteReviewResponse>(
    ENDPOINT_CONFIGS.deleteReview,
    {
      params: { reviewId: id.toString() },
      query: { userId: userId.toString() },
    }
  );

  revalidateTag(ROUTES.PRODUCT_REVIEWS(id));

  return response;
};
