import type { PrismaClient } from '@prisma/client';

import type {
  CreateReviewInput,
  Filters,
  ReviewOutput,
  UpdateReviewInput,
} from '../../types/dto.js';
import type IReviewRepository from './IReviewRepository.js';

const SELECT = {
  id: true,
  email: true,
  isVerified: true,
  phone: true,
  firstName: true,
  lastName: true,
  role: true,
  lastLogin: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export default class PrismaReviewRepository implements IReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(review: CreateReviewInput): Promise<ReviewOutput> {
    const { id } = await this.prisma.review.create({
      data: {
        rating: review.rating,
        comment: review.comment,
        userId: review.userId,
        productId: review.productId,
      },
    });

    return (await this.findById(id)) as ReviewOutput;
  }

  async update(reviewId: number, review: UpdateReviewInput): Promise<ReviewOutput> {
    await this.prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        rating: review.rating,
        comment: review.comment,
      },
    });

    return (await this.findById(reviewId)) as ReviewOutput;
  }

  async delete(reviewId: number): Promise<void> {
    await this.prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
  }

  async findById(reviewId: number): Promise<ReviewOutput | null> {
    return await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        product: true,
        user: {
          select: SELECT,
        },
      },
    });
  }

  async findByUserAndProduct(userId: number, productId: number): Promise<ReviewOutput | null> {
    return await this.prisma.review.findFirst({
      where: {
        userId,
        productId,
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        product: true,
        user: {
          select: SELECT,
        },
      },
    });
  }

  async listAndCount(filters: Filters): Promise<{
    reviews: ReviewOutput[];
    count: number;
  }> {
    const [count, reviews] = await this.prisma.$transaction([
      this.prisma.review.count(),
      this.prisma.review.findMany({
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          product: true,
          user: {
            select: SELECT,
          },
        },
        skip: filters.page - 1,
        take: filters.limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return { reviews, count };
  }

  async listAndCountByProductId(
    productId: number,
    filters: Filters
  ): Promise<{
    reviews: Omit<ReviewOutput, 'product'>[];
    count: number;
  }> {
    const [count, reviews] = await this.prisma.$transaction([
      this.prisma.review.count({
        where: {
          productId,
        },
      }),
      this.prisma.review.findMany({
        where: {
          productId,
        },
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: SELECT,
          },
        },
        skip: filters.page - 1,
        take: filters.limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return { reviews, count };
  }
}
