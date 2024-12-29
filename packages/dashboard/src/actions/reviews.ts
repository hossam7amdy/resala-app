'use server';

import { ROUTES } from '@/routes';
import { reviewService } from '@/services';
import { formatError } from '@/utils/formatError';
import {
  type GetReviewResponse,
  type ListReviewsRequest,
  type ListReviewsResponse,
  ListReviewsSchema,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const listReviews = async (
  query: ListReviewsRequest['query']
): Promise<ListReviewsResponse['data']> => {
  const parsed = ListReviewsSchema.parse({ query });

  return await reviewService.list(parsed.query);
};

export const findReviewById = async (id: string): Promise<GetReviewResponse['data']> => {
  try {
    return await reviewService.find(id);
  } catch {
    return notFound();
  }
};

export const deleteReview = async (id: string, userId: string) => {
  try {
    const data = await reviewService.delete(id, userId);

    revalidatePath(ROUTES.PRODUCT_REVIEWS(id));
    return { data };
  } catch (e) {
    return formatError(e);
  }
};
