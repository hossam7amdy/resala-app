import { reviewService } from '@/services';
import type {
  CreateReviewRequest,
  CreateReviewResponse,
  DeleteReviewResponse,
  GetReviewResponse,
  ListReviewsResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from '@resala/shared';
import type { HandlerResponse } from 'hono/types';

import type { HonoCtx } from '../types';

export const createReview = async (c: HonoCtx): Promise<HandlerResponse<CreateReviewResponse>> => {
  const userId = Number(c.var.user?.id);
  const body = (await c.req.json()) as CreateReviewRequest['body'];

  const review = await reviewService.create({ ...body, userId });

  return c.json(c.json({ success: true, data: review }));
};

export const updateReview = async (c: HonoCtx): Promise<HandlerResponse<UpdateReviewResponse>> => {
  const reviewId = c.req.param('reviewId') as string;
  const body = (await c.req.json()) as UpdateReviewRequest['body'];
  const review = await reviewService.update(+reviewId, body);

  return c.json({ success: true, data: review });
};

export const deleteReview = async (c: HonoCtx): Promise<HandlerResponse<DeleteReviewResponse>> => {
  const userId = Number(c.var.user?.id);
  const reviewId = +c.req.param('reviewId');

  const address = await reviewService.delete(reviewId, userId);

  return c.json({ success: true, data: address });
};

export const getReview = async (c: HonoCtx): Promise<HandlerResponse<GetReviewResponse>> => {
  const reviewId = c.req.param('reviewId');
  const review = await reviewService.find(+reviewId);

  return c.json({ success: true, data: review });
};

export const listReviews = async (c: HonoCtx): Promise<HandlerResponse<ListReviewsResponse>> => {
  const page = +(c.req.query('page') || '1');
  const limit = +(c.req.query('limit') || '10');
  const productId = c.req.query('productId') as string;

  const { reviews, pagination } = await reviewService.list({
    page,
    limit,
    productId: +productId,
  });

  return c.json({
    success: true,
    data: { reviews, pagination },
  });
};
