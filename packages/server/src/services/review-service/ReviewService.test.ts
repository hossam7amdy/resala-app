import { Decimal } from '@prisma/client/runtime/library';
import type { Category, DefaultFilters, Product, User } from '@resala/shared';
import { Mock, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { type MockProxy, mock, mockClear, mockDeep } from 'vitest-mock-extended';

import type { ReviewRepository } from '../../repositories/index.js';
import { ConflictError, NotFoundError } from '../../utils/ApiErrors.js';
import type { InventoryService, UserService } from '../index.js';
import ReviewService from './ReviewService.js';

const userMock: User = {
  id: 1,
  role: 'CUSTOMER',
  createdAt: new Date(),
  updatedAt: new Date(),
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
  createdAt: new Date(),
  updatedAt: new Date(),
  imageKey: '',
  imageUrl: '',
};

const reviewOutputMock = {
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
  let reviewRepo: MockProxy<ReviewRepository>;
  let inventoryService: MockProxy<InventoryService>;
  let reviewService: ReviewService;

  beforeAll(() => {
    userService = mock<UserService>();
    reviewRepo = mock<ReviewRepository>();
    inventoryService = mockDeep<InventoryService>();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockClear(reviewRepo);
    mockClear(userService);
    mockClear(inventoryService);

    reviewService = new ReviewService(reviewRepo, userService, inventoryService);
  });

  describe('createReview', () => {
    // it('should create a review successfully', async () => {
    //   const review = {
    //     userId: 1,
    //     productId: 1,
    //     rating: 3,
    //     comment: 'Great product!',
    //   };
    //   reviewRepo.findByUserAndProduct.mockResolvedValueOnce(null);
    //   (inventoryService.product.findProductById as Mock).mockResolvedValueOnce({
    //     ...productMock,
    //     images: [],
    //     category: {} as Category,
    //   });
    //   reviewRepo.create.mockResolvedValueOnce({
    //     ...reviewOutputMock,
    //     // userId: 1,
    //     // productId: 1,
    //   });

    //   const result = await reviewService.createReview(review);

    //   expect(result).toEqual(reviewOutputMock);
    //   expect(reviewRepo.findByUserAndProduct).toHaveBeenCalledWith(1, 1);
    //   expect(reviewRepo.create).toHaveBeenCalledWith(review);
    // });

    it('should throw ConflictError if review already exists', async () => {
      const review = {
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
      const review = {
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
      const review = {
        userId: 1,
        rating: 3,
        comment: 'Updated rating:3, comment',
      };
      reviewRepo.findById.mockResolvedValueOnce(null);

      await expect(reviewService.updateReview(reviewId, review)).rejects.toThrow(NotFoundError);
    });

    it('should throw ConflictError if review is not owned by user and user is not admin or moderator', async () => {
      const reviewId = 1;
      const review = {
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

  describe('listProductReviews', () => {
    it('should return reviews and count', async () => {
      const productId = 1;
      const filters: DefaultFilters = { page: 1, limit: 10, query: '' };
      const reviews = [reviewOutputMock];
      const count = 1;
      const pagination = { page: 1, limit: 10, total: 1 };

      reviewRepo.listByProductId.mockResolvedValueOnce({ reviews, count });

      const result = await reviewService.listProductReviews(productId, filters);

      expect(result).toEqual({ reviews, pagination });
      expect(reviewRepo.listByProductId).toHaveBeenCalledWith(productId, filters);
    });
  });

  describe('listReviews', () => {
    it('should return reviews and count', async () => {
      const filters: DefaultFilters = { limit: 10, page: 0, query: '' };
      const reviews = [reviewOutputMock];
      const count = 1;
      reviewRepo.list.mockResolvedValueOnce({
        reviews,
        count,
      });

      const result = await reviewService.listReviews(filters);

      expect(result).toEqual({
        reviews,
        pagination: {
          limit: 10,
          page: 0,
          total: 1,
        },
      });
      expect(reviewRepo.list).toHaveBeenCalledWith(filters);
    });
  });
});
