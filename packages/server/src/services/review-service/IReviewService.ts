import type {
  CreateReviewInput,
  Filters,
  ReviewOutput,
  UpdateReviewInput,
} from '../../types/dto.js';

export default interface IReviewService {
  createReview(review: CreateReviewInput): Promise<ReviewOutput>;

  updateReview(reviewId: number, review: UpdateReviewInput): Promise<ReviewOutput>;

  deleteReview(reviewId: number, userId: number): Promise<void>;

  getReviewById(reviewId: number): Promise<ReviewOutput>;

  listAndCountProductReviews(
    productId: number,
    filters: Filters
  ): Promise<{
    count: number;
    reviews: Omit<ReviewOutput, 'product'>[];
  }>;

  listAndCountReviews(filters: Filters): Promise<{
    count: number;
    reviews: ReviewOutput[];
  }>;
}
