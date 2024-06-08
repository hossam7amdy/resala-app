import type {
  CreateReviewInput,
  Filters,
  ReviewOutput,
  UpdateReviewInput,
} from '../../types/dto.js';

export default interface IReviewRepository {
  create(review: CreateReviewInput): Promise<ReviewOutput>;

  update(reviewId: number, review: UpdateReviewInput): Promise<ReviewOutput>;

  delete(reviewId: number): Promise<void>;

  findById(reviewId: number): Promise<ReviewOutput | null>;

  findByUserAndProduct(userId: number, productId: number): Promise<ReviewOutput | null>;

  listAndCount(filters: Filters): Promise<{
    reviews: ReviewOutput[];
    count: number;
  }>;

  listAndCountByProductId(
    productId: number,
    filters: Filters
  ): Promise<{
    reviews: Omit<ReviewOutput, 'product'>[];
    count: number;
  }>;
}
