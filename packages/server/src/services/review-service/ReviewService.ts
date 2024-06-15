import { Role } from '@resala/shared';

import type {
  CreateReviewInput,
  Filters,
  ReviewOutput,
  UpdateReviewInput,
} from '../../DTOs/index.js';
import type IReviewRepository from '../../interfaces/IReviewRepository.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';
import type { inventoryService as InventoryService } from '../index.js';
import type UserService from '../user-service/user-service.js';

export default class ReviewService {
  constructor(
    private readonly reviewRepo: IReviewRepository,
    private readonly userService: UserService,
    private readonly inventoryService: typeof InventoryService
  ) {}

  async createReview(review: CreateReviewInput): Promise<ReviewOutput> {
    const [exist] = await Promise.all([
      this.reviewRepo.findByUserAndProduct(review.userId, review.productId),
      this.inventoryService.findProductById(review.productId),
    ]);
    if (exist) {
      throw new ConflictError('Review already exists');
    }

    return await this.reviewRepo.create(review);
  }

  async updateReview(reviewId: number, review: UpdateReviewInput): Promise<ReviewOutput> {
    const [exist, user] = await Promise.all([
      this.reviewRepo.findById(reviewId),
      this.userService.findUserById(review.userId),
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
      this.userService.findUserById(userId),
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
