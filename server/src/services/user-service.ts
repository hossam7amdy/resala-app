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

  const duplicate = await prisma.user.findFirst({
    where: { phone: payload.phone + '' },
  });
  if (duplicate && duplicate.id !== id) {
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
    select: SELECT,
    where: { id },
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
    firstName: { startsWith: query },
    lastName: { startsWith: query },
    email: { startsWith: query },
    phone: { startsWith: query },
  };

  const [total, users] = await prisma.$transaction([
    prisma.user.count({
      where: {
        OR: [filters],
      },
    }),
    prisma.user.findMany({
      select: SELECT,
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

export const findUserAddress = async (userId: number, addressId: number) => {
  const userAddr = await prisma.userAddress.findFirst({
    select: {
      address: true,
    },
    where: { userId, addressId },
  });

  if (!userAddr) {
    throw new NotFoundError('Address not found');
  }

  return userAddr.address;
};

export const updateUserAddress = async (
  userId: number,
  addressId: number,
  payload: Prisma.AddressCreateInput
) => {
  const exist = await prisma.userAddress.findFirst({
    where: { userId, addressId },
  });
  if (!exist) {
    throw new NotFoundError('Address not found');
  }

  const address = await prisma.address.upsert({
    create: payload,
    update: payload,
    where: { id: addressId },
  });

  return address;
};

export const deleteUserAddress = async (userId: number, addressId: number) => {
  const exist = await prisma.userAddress.findFirst({
    where: { userId, addressId },
  });
  if (!exist) {
    throw new NotFoundError('Address not found');
  }

  await prisma.address.delete({
    where: { id: addressId },
  });

  return true;
};

export const listUserAddresses = async (userId: number) => {
  const addresses = await prisma.userAddress.findMany({
    select: {
      address: true,
    },
    where: { userId },
  });

  return addresses.map(address => address.address);
};
