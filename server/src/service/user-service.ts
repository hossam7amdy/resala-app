import { Prisma } from '@prisma/client';

import { prisma } from '../model';
import { ConflictError, NotFoundError } from '../utils/api-errors';

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

export const updateUser = async (id: number, payload: Prisma.UserUpdateInput) => {
  const user = await findUserById(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const duplicate = payload.phone && (await findUserByPhone(payload.phone as string));
  if (duplicate) {
    throw new ConflictError('User with this phone already exists!');
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: payload,
    select: SELECT,
  });

  return updatedUser;
};

export const deleteUser = async (id: number) => {
  const user = await findUserById(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  await prisma.user.delete({ where: { id } });
  return true;
};

export const findUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

export const findUserByPhone = async (phone: string) => {
  const user = await prisma.user.findFirst({
    where: { phone },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

export const listUsersPaginated = async (pagination: {
  page: number;
  limit: number;
  query: string;
}) => {
  const { page, limit, query } = pagination;
  const filters = {
    firstName: { contains: query },
    lastName: { contains: query },
    email: { contains: query },
    phone: { contains: query },
  };

  const [total, users] = await prisma.$transaction([
    prisma.user.count({
      where: {
        OR: [filters],
      },
    }),
    prisma.user.findMany({
      where: {
        OR: [filters],
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
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
};

export const getUserAddressList = async (id: number) => {
  const addresses = await prisma.userAddress.findMany({
    select: {
      address: true,
    },
    where: { userId: id },
  });

  return addresses.map(address => address.address);
};

export const createUserAddress = async (userId: number, payload: Prisma.AddressCreateInput) => {
  const address = await prisma.$transaction(async prisma => {
    const address = await prisma.address.create({ data: payload });
    await prisma.userAddress.create({ data: { userId, addressId: address.id } });
    return address;
  });

  return address;
};

export const updateUserAddress = async (
  userId: number,
  addressId: number,
  payload: Prisma.AddressUpdateInput
) => {
  const exist = prisma.userAddress.findFirst({
    where: { userId, addressId },
  });
  if (!exist) {
    throw new NotFoundError('Address not found');
  }

  const address = await prisma.address.update({
    where: { id: addressId },
    data: payload,
  });

  return address;
};
