import type { PrismaClient } from '@prisma/client';
import type { DefaultFilters, Review } from '@resala/shared';

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
};

export default class ReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Omit<Review, 'id'>) {
    return await this.prisma.review.create({ data });
  }

  async update(id: number, data: Partial<Review>) {
    return await this.prisma.review.update({ data, where: { id } });
  }

  async delete(id: number) {
    return await this.prisma.review.delete({ where: { id } });
  }

  async list({ page, limit }: Omit<DefaultFilters, 'query'>) {
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
          user: { select: SELECT },
        },
        skip: page - 1,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return { reviews, count };
  }

  async listByProductId(productId: number, { page, limit }: Omit<DefaultFilters, 'query'>) {
    const [count, reviews] = await this.prisma.$transaction([
      this.prisma.review.count({ where: { productId } }),
      this.prisma.review.findMany({
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          user: { select: SELECT },
        },
        where: { productId },
        skip: page - 1,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return { reviews, count };
  }

  async findById(id: number) {
    return await this.prisma.review.findUnique({
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        product: true,
        user: { select: SELECT },
      },
      where: { id },
    });
  }

  async findByUserAndProduct(userId: number, productId: number) {
    return await this.prisma.review.findFirst({
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        updatedAt: true,
        product: true,
        user: { select: SELECT },
      },
      where: { userId, productId },
    });
  }
}
