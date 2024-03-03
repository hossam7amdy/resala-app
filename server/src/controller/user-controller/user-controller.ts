import { Prisma } from '@prisma/client';
import { RequestHandler } from 'express';

import { BadRequestError, NotFoundError } from '../../lib/error';
import { signJwt } from '../../lib/jwt-token';
import { sendVerificationEmail } from '../../lib/mailer';
import { prisma } from '../../model';
import { genHashedPassword, verifyHashedPassword } from '../../utils/password';
import {
  validateChangePasswordData,
  validateQueryParams,
  validateUpdateProfileData,
  validateUserCreationData,
  validateUserUpdateData,
} from './user-validator';

const PAGE_SIZE = 10;

const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
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
    },
  });
};

export const getProfile: RequestHandler = async (_req, res) => {
  const userId = res.locals.user.id as string;
  const user = await getUserById(userId);

  return res.json({
    success: true,
    data: user,
  });
};

export const changePassword: RequestHandler = async (req, res) => {
  const error = validateChangePasswordData(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const userId = res.locals.user.id as string;
  const { oldPassword, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const verified = await verifyHashedPassword({
    password: oldPassword,
    salt: user.salt,
    iterations: user.iterations,
    hashedPassword: user.password,
  });
  if (!verified) {
    throw new BadRequestError('Old password is incorrect');
  }

  const { hashedPassword, salt, iterations } = await genHashedPassword(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword, salt, iterations },
  });

  return res.json({
    success: true,
    message: 'Password changed successfully',
  });
};

export const resendVerificationEmail: RequestHandler = async (_req, res) => {
  const email = res.locals.user.email as string;
  const user = await prisma.user.findUnique({
    where: { email },
    select: { isVerified: true },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.isVerified) {
    throw new BadRequestError('User is already verified');
  }

  const token = signJwt({ id: '', email });
  await sendVerificationEmail(email, token);

  return res.json({
    success: true,
    message: 'Verification email sent successfully',
  });
};

export const updateProfile: RequestHandler = async (req, res) => {
  const error = validateUpdateProfileData(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const userId = res.locals.user.id as string;
  const { firstName, lastName, phone } = req.body;
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, phone },
    });
  } catch (error) {
    throw new BadRequestError('This phone number is already used by another user!');
  }

  return res.json({
    success: true,
    message: 'Profile updated successfully',
  });
};

export const adminGetUser: RequestHandler = async (req, res) => {
  const userId = req.params.userId as string;
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return res.json({
    success: true,
    data: user,
  });
};

export const adminGetUsersList: RequestHandler = async (req, res) => {
  const error = validateQueryParams(req.query);
  if (error) {
    throw new BadRequestError(error);
  }

  const page = parseInt(req.query.page as string);
  const query = (req.query.query as string) || '';
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

export const adminDeleteUser: RequestHandler = async (req, res) => {
  const userId = req.params.userId as string;
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new BadRequestError('User is already deleted');
    }
    throw error;
  }

  return res.json({
    success: true,
    message: 'User deleted successfully',
  });
};

export const adminCreateUser: RequestHandler = async (req, res) => {
  const error = validateUserCreationData(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const userExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: req.body.email }, { phone: req.body.phone }],
    },
  });
  if (userExist) {
    throw new BadRequestError('User with this email or phone already exists!');
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
    },
  });

  return res.json({
    success: true,
    data: user,
  });
};

export const adminUpdateUser: RequestHandler = async (req, res) => {
  const userId = req.params.userId as string;
  const error = validateUserUpdateData(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const userExist = await prisma.user.findFirst({
    where: {
      AND: [{ id: { not: userId } }, { phone: req.body.phone }],
    },
  });
  if (userExist) {
    throw new BadRequestError('User with this phone already exists!');
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      role: req.body.role,
    },
  });

  return res.json({
    success: true,
    message: 'User updated successfully',
  });
};
