import { reviewService } from '@/services';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  CreateReviewSchema,
  DeleteReviewSchema,
  GetReviewSchema,
  ListReviewsSchema,
  ReviewSchema,
  UpdateReviewSchema,
} from '@resala/shared';

import type { Env } from '../types';

const createReviewRoute = createRoute({
  tags: ['Review'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateReviewSchema.shape.body,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            data: ReviewSchema,
          }),
        },
      },
      description: 'Review created successfully',
    },
  },
});
const updateReviewRoute = createRoute({
  tags: ['Review'],
  method: 'put',
  path: '/{id}',
  request: {
    params: UpdateReviewSchema.shape.params,
    body: {
      content: {
        'application/json': {
          schema: UpdateReviewSchema.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: ReviewSchema,
          }),
        },
      },
      description: 'Review updated successfully',
    },
  },
});
const deleteReviewRoute = createRoute({
  tags: ['Review'],
  method: 'delete',
  path: '/{id}',
  request: {
    params: DeleteReviewSchema.shape.params,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: ReviewSchema,
          }),
        },
      },
      description: 'Review deleted successfully',
    },
  },
});
const getReviewRoute = createRoute({
  tags: ['Review'],
  method: 'get',
  path: '/{id}',
  request: {
    params: GetReviewSchema.shape.params,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: ReviewSchema,
          }),
        },
      },
      description: 'Review retrieved successfully',
    },
  },
});
const listReviewsRoute = createRoute({
  tags: ['Review'],
  method: 'get',
  path: '/',
  request: {
    query: ListReviewsSchema.shape.query.extend({
      productId: z.string().optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: z.object({
              reviews: z.array(ReviewSchema),
              pagination: z.object({
                page: z.number(),
                limit: z.number(),
                total: z.number(),
              }),
            }),
          }),
        },
      },
      description: 'Reviews retrieved successfully',
    },
  },
});

export const reviewHandler = new OpenAPIHono<Env>()
  .openapi(createReviewRoute, async c => {
    const userId = c.var.user.id;
    const body = c.req.valid('json');
    const review = await reviewService.create({ ...body, userId });
    return c.json({ success: true, data: review });
  })
  .openapi(updateReviewRoute, async c => {
    const userId = c.var.user.id;
    const reviewId = c.req.param('id');
    const body = c.req.valid('json');
    const review = await reviewService.update(reviewId, { userId, ...body });
    return c.json({ success: true, data: review });
  })
  .openapi(deleteReviewRoute, async c => {
    const userId = c.var.user.id;
    const reviewId = c.req.param('id');
    const address = await reviewService.delete(reviewId, userId);
    return c.json({ success: true, data: address });
  })
  .openapi(getReviewRoute, async c => {
    const reviewId = c.req.param('id');
    const review = await reviewService.find(reviewId);
    return c.json({ success: true, data: review });
  })
  .openapi(listReviewsRoute, async c => {
    const { page, limit, productId } = c.req.valid('query');
    const { reviews, pagination } = await reviewService.list({ page, limit, productId });
    return c.json({ success: true, data: { reviews, pagination } });
  });
