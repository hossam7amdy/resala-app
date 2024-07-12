import type { Prisma, PrismaClient } from '@prisma/client';
import type { DefaultFilters, User } from '@resala/shared';

import UserAddressRepository from './UserAddressRepository.js';

const USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  isVerified: true,
  phone: true,
  role: true,
  lastLogin: true,
  createdAt: true,
  updatedAt: true,
};

type UserSensitiveData = {
  password: string;
  salt: string;
  iterations: number;
};

export default class UserRepository {
  private readonly prisma: PrismaClient;
  readonly address: UserAddressRepository;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.address = new UserAddressRepository(prisma);
  }

  async create(user: Omit<User, 'id'> & UserSensitiveData) {
    return await this.prisma.user.create({
      data: user,
      select: USER_SELECT,
    });
  }

  async update(id: number, user: Partial<User & UserSensitiveData>) {
    return await this.prisma.user.update({
      where: { id },
      data: user,
      select: USER_SELECT,
    });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({
      where: { id },
      select: USER_SELECT,
    });
  }

  async list({ page, limit, query }: DefaultFilters) {
    const filters: Prisma.UserWhereInput = {
      OR: [
        { firstName: { startsWith: query.split(' ')[0], mode: 'insensitive' } },
        { lastName: { startsWith: query.split(' ')[1], mode: 'insensitive' } },
        { email: { startsWith: query.split(' ')[0], mode: 'insensitive' } },
        { phone: { startsWith: query.split(' ')[0], mode: 'insensitive' } },
      ],
    };

    const [total, users] = await this.prisma.$transaction([
      this.prisma.user.count({ where: filters }),

      this.prisma.user.findMany({
        select: USER_SELECT,
        where: filters,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return { users, total };
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: USER_SELECT,
    });
  }

  async findByPhone(phone: string) {
    return await this.prisma.user.findFirst({
      where: { phone },
      select: USER_SELECT,
    });
  }

  async findByEmailOrPhoneSensitive(emailOrPhone: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    });
  }
}
