import { Role } from '@resala/shared';

import type IReviewRepository from '../../repository/review-repository/IReviewRepository.js';
import type {
  CreateReviewInput,
  Filters,
  ReviewOutput,
  UpdateReviewInput,
} from '../../types/dto.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';
import { inventoryService, userService } from '../index.js';
import type IReviewService from './IReviewService.js';

export default class ReviewService implements IReviewService {
  constructor(private readonly reviewRepo: IReviewRepository) {}

  async createReview(review: CreateReviewInput): Promise<ReviewOutput> {
    const [exist] = await Promise.all([
      this.reviewRepo.findByUserAndProduct(review.userId, review.productId),
      inventoryService.findProductById(review.productId),
    ]);
    if (exist) {
      throw new ConflictError('Review already exists');
    }

    return await this.reviewRepo.create(review);
  }

  async updateReview(reviewId: number, review: UpdateReviewInput): Promise<ReviewOutput> {
    const [exist, user] = await Promise.all([
      this.reviewRepo.findById(reviewId),
      userService.findUserById(review.userId),
    ]);

    if (!exist) {
      throw new NotFoundError('Review not found');
    }

    if (
      exist.user?.id !== review.userId &&
      ![Role.ADMIN, Role.MODERATOR].includes(user.role as Role)
    ) {
      throw new ConflictError('Review not owned by user');
    }

    return await this.reviewRepo.update(reviewId, review);
  }

  async deleteReview(reviewId: number, userId: number): Promise<void> {
    const [exist, user] = await Promise.all([
      this.reviewRepo.findById(reviewId),
      userService.findUserById(userId),
    ]);

    if (!exist) {
      throw new NotFoundError('Review not found');
    }

    if (exist.user?.id !== userId && ![Role.ADMIN, Role.MODERATOR].includes(user.role as Role)) {
      throw new ConflictError('Review not owned by user');
    }

    await this.reviewRepo.delete(reviewId);
  }

  async getReviewById(reviewId: number): Promise<ReviewOutput> {
    const review = await this.reviewRepo.findById(reviewId);

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    return review;
  }

  async listAndCountProductReviews(
    productId: number,
    filters: Filters
  ): Promise<{
    count: number;
    reviews: Omit<ReviewOutput, 'product'>[];
  }> {
    return await this.reviewRepo.listAndCountByProductId(productId, filters);
  }

  async listAndCountReviews(filters: Filters): Promise<{
    count: number;
    reviews: ReviewOutput[];
  }> {
    return await this.reviewRepo.listAndCount(filters);
  }
}
