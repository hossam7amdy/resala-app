import { z } from 'zod';

import { OffsetPageParamsSchema } from './common.schema.js';

const ReviewSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  productId: z.string(),
  rating: z.number().int().min(1).max(5).default(5),
  comment: z.string().optional().nullable(),
  mediaId: z.string().optional().nullable(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateReviewSchema = z.object({
  body: ReviewSchema.pick({
    productId: true,
    rating: true,
    comment: true,
    mediaId: true,
  }),
});

const UpdateReviewSchema = z.object({
  params: ReviewSchema.pick({ id: true }),
  body: ReviewSchema.pick({
    rating: true,
    comment: true,
    mediaId: true,
  }),
});

const GetReviewSchema = z.object({
  params: ReviewSchema.pick({ id: true }),
});

const ListReviewsSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    productId: z.string().optional(),
  }),
});

const DeleteReviewSchema = z.object({
  params: ReviewSchema.pick({ id: true }),
});

export {
  ReviewSchema,
  CreateReviewSchema,
  UpdateReviewSchema,
  GetReviewSchema,
  ListReviewsSchema,
  DeleteReviewSchema,
};
