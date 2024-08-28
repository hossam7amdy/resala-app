import type {
  CreateReviewRequest,
  GetReviewResponse,
  ListReviewsRequest,
  ListReviewsResponse,
  UpdateReviewRequest,
} from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import { ConflictError } from '../../errors/api.errors.js';

export class ReviewService {
  constructor(private readonly db: DataStore) {}

  async create(review: CreateReviewRequest['body'] & { userId: number }) {
    const reviewsLength = await this.db.review.count({
      where: { userId: review.userId, productId: review.productId },
    });

    if (reviewsLength > 0) {
      throw new ConflictError('User already reviewed this product');
    }

    return await this.db.review.create({
      data: {
        productId: review.productId,
        userId: review.userId,
        rating: review.rating,
        comment: review.comment || null,
      },
    });
  }

  async update(reviewId: number, review: UpdateReviewRequest['body'] & { userId: number }) {
    return await this.db.review.update({
      where: { id: reviewId },
      data: review,
    });
  }

  async delete(reviewId: number, userId: number) {
    return await this.db.review.delete({
      where: { id: reviewId, userId },
    });
  }

  async find(reviewId: number): Promise<GetReviewResponse['data']> {
    return await this.db.review.findUniqueOrThrow({
      where: { id: reviewId },
      include: {
        user: true,
      },
    });
  }

  async list({
    page = 1,
    limit = 10,
    productId,
  }: ListReviewsRequest['query']): Promise<ListReviewsResponse['data']> {
    const [count, reviews] = await this.db.$transaction([
      this.db.review.count({ where: { productId } }),
      this.db.review.findMany({
        include: {
          user: true,
        },
        where: { productId },
        skip: page - 1,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return {
      pagination: { page, limit, total: count },
      reviews,
    };
  }
}
