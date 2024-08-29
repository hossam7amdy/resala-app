'use server';

import { callEndpoint } from '@/services/callEndpoint';
import { ROUTES } from '@/utils/routes';
import type { DeleteReviewRequest, DeleteReviewResponse } from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const deleteReview = async (id: number, userId: number) => {
  const response = await callEndpoint<DeleteReviewRequest, DeleteReviewResponse>(
    ENDPOINT_CONFIGS.deleteReview,
    {
      params: { reviewId: id.toString() },
      query: { userId: userId.toString() },
    }
  );

  revalidatePath(ROUTES.PRODUCT_REVIEWS(id));

  return response;
};
