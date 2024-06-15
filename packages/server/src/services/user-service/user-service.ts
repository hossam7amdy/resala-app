import type { Prisma, PrismaClient } from '@prisma/client';

import { ConflictError, NotFoundError } from '../../utils/api-errors.js';

const SELECT = {
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
  deletedAt: true,
};
export default class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async updateUser(id: number, payload: Prisma.UserUpdateInput) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const duplicate = await this.prisma.user.findFirst({
      where: { phone: payload.phone + '' },
    });
    if (duplicate && duplicate.id !== id) {
      throw new ConflictError('User with this phone already exists!');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: payload,
      select: SELECT,
    });

    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return await this.prisma.user.delete({ select: SELECT, where: { id } });
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      select: SELECT,
      where: { id },
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async listUsersPaginated(filters: { page: number; limit: number; query: string }) {
    const { page, limit, query } = filters;

    const _filters = [
      { firstName: { startsWith: query } },
      { lastName: { startsWith: query } },
      { email: { startsWith: query } },
      { phone: { startsWith: query } },
    ];

    const [total, users] = await this.prisma.$transaction([
      this.prisma.user.count({
        where: {
          OR: _filters,
        },
      }),
      this.prisma.user.findMany({
        select: SELECT,
        where: {
          OR: _filters,
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
      },
    };
  }

  async getUserAddressList(id: number) {
    const addresses = await this.prisma.userAddress.findMany({
      select: {
        address: true,
      },
      where: { userId: id },
      orderBy: {
        addressId: 'desc',
      },
    });

    return addresses.map(address => address.address);
  }

  async createUserAddress(userId: number, payload: Prisma.AddressCreateInput) {
    const address = await this.prisma.$transaction(async prisma => {
      const address = await prisma.address.create({ data: payload });
      await prisma.userAddress.create({ data: { userId, addressId: address.id } });
      return address;
    });

    return address;
  }

  async findUserAddress(userId: number, addressId: number) {
    const userAddr = await this.prisma.userAddress.findFirst({
      select: {
        address: true,
      },
      where: { userId, addressId },
    });

    if (!userAddr) {
      throw new NotFoundError('Address not found');
    }

    return userAddr.address;
  }

  async updateUserAddress(userId: number, addressId: number, payload: Prisma.AddressCreateInput) {
    const exist = await this.prisma.userAddress.findFirst({
      where: { userId, addressId },
    });
    if (!exist) {
      throw new NotFoundError('Address not found');
    }

    const address = await this.prisma.address.upsert({
      create: payload,
      update: payload,
      where: { id: addressId },
    });

    return address;
  }

  async deleteUserAddress(userId: number, addressId: number) {
    const exist = await this.prisma.userAddress.findFirst({
      where: { userId, addressId },
    });
    if (!exist) {
      throw new NotFoundError('Address not found');
    }

    return await this.prisma.address.delete({
      where: { id: addressId },
    });
  }
}
