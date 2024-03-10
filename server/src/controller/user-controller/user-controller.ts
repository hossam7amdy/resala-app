import { Prisma } from '@prisma/client';

import { BadRequestError, ConflictError, NotFoundError } from '../../lib/error';
import { prisma } from '../../model';
import { genHashedPassword } from '../../utils/password';
import {
  AdminCreateUser,
  AdminDeleteUser,
  AdminGetUser,
  AdminGetUsersList,
  AdminUpdateUser,
  GetProfile,
  UpdateProfile,
} from './user-types';

export const getProfile: GetProfile = async (_, res, next) => {
  const userId = res.locals.user.id;
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      role: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      isVerified: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
    where: { id: userId },
  });

  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  return res.json({
    success: true,
    data: user,
  });
};

export const updateProfile: UpdateProfile = async (req, res, next) => {
  const userId = res.locals.user.id;
  const { firstName, lastName, phone } = req.body;
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, phone },
    });
  } catch (error) {
    return next(new BadRequestError('This phone number is already used by another user!'));
  }

  return res.json({
    success: true,
    message: 'Profile updated successfully',
  });
};

export const adminGetUser: AdminGetUser = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      role: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      isVerified: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
    where: { id: userId },
  });

  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  return res.json({
    success: true,
    data: user,
  });
};

export const adminGetUsersList: AdminGetUsersList = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page || '1');
  const query = req.query.query || '';

  const [total, users] = await prisma.$transaction([
    prisma.user.count({
      where: {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
          { email: { contains: query } },
          { phone: { contains: query } },
        ],
      },
    }),
    prisma.user.findMany({
      select: {
        id: true,
        role: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        isVerified: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      where: {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
          { email: { contains: query } },
          { phone: { contains: query } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return res.json({
    success: true,
    data: {
      total,
      users,
    },
  });
};

export const adminDeleteUser: AdminDeleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return next(new NotFoundError('User not found'));
    }
    return next(error);
  }

  return res.json({
    success: true,
    message: 'User deleted successfully',
  });
};

export const adminCreateUser: AdminCreateUser = async (req, res, next) => {
  const userExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: req.body.email }, { phone: req.body.phone }],
    },
  });
  if (userExist) {
    return next(new BadRequestError('User with this email or phone already exists!'));
  }

  const { hashedPassword, salt, iterations } = await genHashedPassword(req.body.password);
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      phone: req.body.phone,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      password: hashedPassword,
      salt,
      iterations,
    },
    select: {
      id: true,
      role: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      isVerified: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });

  return res.json({
    success: true,
    data: user,
  });
};

export const adminUpdateUser: AdminUpdateUser = async (req, res, next) => {
  const userId = req.params.userId;

  const user = await prisma.user.findUnique({
    select: { id: true },
    where: { id: userId },
  });
  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  const userExist = await prisma.user.findFirst({
    where: {
      AND: [{ id: { not: userId } }, { phone: req.body.phone }],
    },
  });
  if (userExist) {
    return next(new ConflictError('User with this phone already exists!'));
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      role: req.body.role,
    },
    select: {
      id: true,
      role: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      isVerified: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });

  return res.json({
    success: true,
    data: updated,
  });
};
