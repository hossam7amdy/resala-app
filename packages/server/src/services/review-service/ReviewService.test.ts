import { Decimal } from '@prisma/client/runtime/library';
import type { Category, Product, User } from '@resala/shared';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { type MockProxy, mock, mockClear } from 'vitest-mock-extended';

import type {
  CreateReviewInput,
  Filters,
  ReviewOutput,
  UpdateReviewInput,
} from '../../DTOs/index.js';
import type IReviewRepository from '../../interfaces/IReviewRepository.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';
import type { inventoryService as InventoryService, UserService } from '../index.js';
import ReviewService from './ReviewService.js';

const userMock: User = {
  id: 1,
  role: 'CUSTOMER',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  email: 'fake@mail.com',
  isVerified: false,
  phone: '01000000000',
  firstName: 'fake',
  lastName: 'user',
  lastLogin: new Date(),
};

const productMock: Product = {
  id: 1,
  categoryId: 10,
  arName: 'اسم المنتج',
  enName: 'Product Name',
  arDescription: 'وصف المنتج',
  enDescription: 'Product Description',
  price: new Decimal(109),
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const reviewOutputMock: ReviewOutput = {
  id: 1,
  rating: 3,
  comment: 'Great product!',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: userMock,
  product: productMock,
};

describe('ReviewService', () => {
  let userService: MockProxy<UserService>;
  let reviewRepo: MockProxy<IReviewRepository>;
  let reviewService: ReviewService;
  let inventoryService: MockProxy<typeof InventoryService>;

  beforeAll(() => {
    userService = mock<UserService>();
    reviewRepo = mock<IReviewRepository>();
    inventoryService = mock<typeof InventoryService>();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockClear(reviewRepo);
    mockClear(userService);
    mockClear(inventoryService);

    reviewService = new ReviewService(reviewRepo, userService, inventoryService);
  });

  describe('createReview', () => {
    it('should create a review successfully', async () => {
      const review: CreateReviewInput = {
        userId: 1,
        productId: 1,
        rating: 3,
        comment: 'Great product!',
      };
      reviewRepo.findByUserAndProduct.mockResolvedValueOnce(null);
      inventoryService.findProductById.mockResolvedValueOnce({
        ...productMock,
        images: [],
        category: {} as Category,
      });
      reviewRepo.create.mockResolvedValueOnce(reviewOutputMock);

      const result = await reviewService.createReview(review);

      expect(result).toEqual(reviewOutputMock);
      expect(reviewRepo.findByUserAndProduct).toHaveBeenCalledWith(1, 1);
      expect(reviewRepo.create).toHaveBeenCalledWith(review);
    });

    it('should throw ConflictError if review already exists', async () => {
      const review: CreateReviewInput = {
        userId: 1,
        productId: 1,
        rating: 3,
        comment: 'Great product!',
      };
      reviewRepo.findByUserAndProduct.mockResolvedValueOnce(reviewOutputMock);

      await expect(reviewService.createReview(review)).rejects.toThrow(ConflictError);
    });
  });

  describe('updateReview', () => {
    it('should update a review successfully', async () => {
      const reviewId = 1;
      const review: CreateReviewInput = {
        userId: 1,
        productId: 1,
        rating: 3,
        comment: 'Great product!',
      };

      reviewRepo.findById.mockResolvedValueOnce(reviewOutputMock);
      userService.findUserById.mockResolvedValueOnce(userMock);
      reviewRepo.update.mockResolvedValueOnce(reviewOutputMock);

      const result = await reviewService.updateReview(reviewId, review);

      expect(result).toEqual(reviewOutputMock);
      expect(reviewRepo.findById).toHaveBeenCalledWith(reviewId);
      expect(reviewRepo.update).toHaveBeenCalledWith(reviewId, review);
    });

    it('should throw NotFoundError if review does not exist', async () => {
      const reviewId = 1;
      const review: UpdateReviewInput = {
        userId: 1,
        rating: 3,
        comment: 'Updated rating:3, comment',
      };
      reviewRepo.findById.mockResolvedValueOnce(null);

      await expect(reviewService.updateReview(reviewId, review)).rejects.toThrow(NotFoundError);
    });

    it('should throw ConflictError if review is not owned by user and user is not admin or moderator', async () => {
      const reviewId = 1;
      const review: UpdateReviewInput = {
        userId: 2,
        rating: 3,
        comment: 'Updated rating:3, comment',
      };
      reviewRepo.findById.mockResolvedValueOnce(reviewOutputMock);
      userService.findUserById.mockResolvedValueOnce(userMock);

      await expect(reviewService.updateReview(reviewId, review)).rejects.toThrow(ConflictError);
    });
  });

  describe('deleteReview', () => {
    it('should delete a review successfully', async () => {
      const reviewId = 1;
      const userId = 1;
      reviewRepo.findById.mockResolvedValueOnce(reviewOutputMock);
      userService.findUserById.mockResolvedValueOnce(userMock);

      await reviewService.deleteReview(reviewId, userId);

      expect(reviewRepo.findById).toHaveBeenCalledWith(reviewId);
      expect(reviewRepo.delete).toHaveBeenCalledWith(reviewId);
    });

    it('should throw NotFoundError if review does not exist', async () => {
      const reviewId = 1;
      const userId = 1;
      reviewRepo.findById.mockResolvedValueOnce(null);

      await expect(reviewService.deleteReview(reviewId, userId)).rejects.toThrow(NotFoundError);
    });

    it('should throw ConflictError if review is not owned by user and user is not admin or moderator', async () => {
      const reviewId = 1;
      const userId = 2;
      reviewRepo.findById.mockResolvedValueOnce(reviewOutputMock);
      userService.findUserById.mockResolvedValueOnce(userMock);

      await expect(reviewService.deleteReview(reviewId, userId)).rejects.toThrow(ConflictError);
    });
  });

  describe('getReviewById', () => {
    it('should return review if it exists', async () => {
      const reviewId = 1;
      reviewRepo.findById.mockResolvedValueOnce(reviewOutputMock);

      const result = await reviewService.getReviewById(reviewId);

      expect(result).toEqual(reviewOutputMock);
      expect(reviewRepo.findById).toHaveBeenCalledWith(reviewId);
    });

    it('should throw NotFoundError if review does not exist', async () => {
      const reviewId = 1;
      reviewRepo.findById.mockResolvedValueOnce(null);

      await expect(reviewService.getReviewById(reviewId)).rejects.toThrow(NotFoundError);
    });
  });

  describe('listAndCountProductReviews', () => {
    it('should return reviews and count', async () => {
      const productId = 1;
      const filters: Filters = { page: 1, limit: 10, query: '' };
      const reviews = [reviewOutputMock];
      const count = 1;
      reviewRepo.listAndCountByProductId.mockResolvedValueOnce({ reviews, count });

      const result = await reviewService.listAndCountProductReviews(productId, filters);

      expect(result).toEqual({ reviews, count });
      expect(reviewRepo.listAndCountByProductId).toHaveBeenCalledWith(productId, filters);
    });
  });

  describe('listAndCountReviews', () => {
    it('should return reviews and count', async () => {
      const filters: Filters = { limit: 10, page: 0, query: '' };
      const reviews = [reviewOutputMock];
      const count = 1;
      reviewRepo.listAndCount.mockResolvedValueOnce({ reviews, count });

      const result = await reviewService.listAndCountReviews(filters);

      expect(result).toEqual({ reviews, count });
      expect(reviewRepo.listAndCount).toHaveBeenCalledWith(filters);
    });
  });
});
