import { Role } from '@resala/shared';
import type {
  CreateReviewRequest,
  DefaultFilters,
  GetReviewResponse,
  GetReviewsListResponse,
  UpdateReviewRequest,
} from '@resala/shared';

import type { ReviewRepository } from '../../repositories/index.js';
import { ConflictError, NotFoundError } from '../../utils/ApiErrors.js';
import type { InventoryService } from '../index.js';
import type UserService from '../user-service/UserService.js';

export default class ReviewService {
  constructor(
    private readonly reviewRepo: ReviewRepository,
    private readonly userService: UserService,
    private readonly inventoryService: InventoryService
  ) {}

  async createReview(review: CreateReviewRequest['body'] & { userId: number }) {
    const [exist] = await Promise.all([
      this.reviewRepo.findByUserAndProduct(review.userId, review.productId),
      this.inventoryService.productService.findProductById(review.productId),
    ]);
    if (exist) {
      throw new ConflictError('Review already exists');
    }

    return await this.reviewRepo.create({
      productId: review.productId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateReview(reviewId: number, review: UpdateReviewRequest['body'] & { userId: number }) {
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

  async deleteReview(reviewId: number, userId: number) {
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

    return await this.reviewRepo.delete(reviewId);
  }

  async getReviewById(reviewId: number): Promise<GetReviewResponse['data']> {
    const review = await this.reviewRepo.findById(reviewId);

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    return review;
  }

  async listProductReviews(
    productId: number,
    filters: Omit<DefaultFilters, 'query'>
  ): Promise<GetReviewsListResponse['data']> {
    const { count, reviews } = await this.reviewRepo.listByProductId(productId, filters);

    return {
      pagination: { page: filters.page, limit: filters.limit, total: count },
      reviews,
    };
  }

  async listReviews(filters: DefaultFilters): Promise<GetReviewsListResponse['data']> {
    const { count, reviews } = await this.reviewRepo.list(filters);

    return {
      pagination: { page: filters.page, limit: filters.limit, total: count },
      reviews,
    };
  }
}
