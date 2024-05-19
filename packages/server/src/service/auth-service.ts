import type { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';

import * as Jwt from '../lib/jwt-token/jwt-token.js';
import prisma from '../lib/prisma/index.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/api-errors.js';
import { genHashedPassword, verifyHashedPassword } from '../utils/password.js';
import { generateRandomString } from '../utils/random.js';

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

export const authenticate = async (sign: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: sign }, { phone: sign }],
    },
  });
  if (!user) {
    throw new NotFoundError('User not registered');
  }

  const verified = await verifyHashedPassword({
    password: password!,
    salt: user.salt,
    iterations: user.iterations,
    hashedPassword: user.password,
  });
  if (!verified) {
    throw new BadRequestError('Invalid email/phone or password');
  }

  prisma.user
    .update({
      data: { lastLogin: new Date() },
      where: { id: user.id },
    })
    .catch(console.error);

  const accessToken = Jwt.signJwt({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
  const refreshToken = Jwt.signJwt({ id: user.id, email: user.email }, process.env.JWT_REFRESH!, {
    expiresIn: '7d',
  });

  // eslint-disable-next-line no-unused-vars
  const { password: _, salt: __, iterations: ___, ...userWithoutPassword } = user;
  return {
    expiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: userWithoutPassword,
  };
};

export const register = async (payload: Omit<Prisma.UserCreateInput, 'salt' | 'iterations'>) => {
  const duplicate = await prisma.user.findFirst({
    where: { OR: [{ email: payload.email }, { phone: payload.phone }] },
  });
  if (duplicate) {
    throw new ConflictError('User already registered');
  }

  const { hashedPassword, salt, iterations } = await genHashedPassword(payload.password);

  const user = await prisma.user.create({
    select: SELECT,
    data: {
      ...payload,
      password: hashedPassword,
      salt: salt,
      iterations,
    },
  });

  // generate verify token
  const token = Jwt.signJwt({ id: user.id, email: user.email }, process.env.JWT_VERIFY!, {
    expiresIn: '30d',
  });

  return {
    user,
    verifyToken: token,
  };
};

export const verifyEmail = async (email: string, token: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const jwtObj = await validateJwtToken(token, process.env.JWT_VERIFY!);
  if (email !== jwtObj.email) {
    throw new BadRequestError('Invalid token');
  }

  await prisma.user.update({
    data: { isVerified: true },
    where: { id: user.id },
  });

  return true;
};

export const changePassword = async (email: string, oldPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
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
    data: { password: hashedPassword, salt, iterations },
    where: { id: user.id },
  });

  return true;
};

export const forgotPassword = async (email: string) => {
  // validate user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // generate reset token
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const resetCode = generateRandomString(6).toUpperCase();
  const token = Jwt.signJwt({ id: user.id, email, resetCode }, process.env.JWT_RESET!, {
    expiresIn: '1h',
  });

  return { expiresAt, token, resetCode };
};

export const resetPassword = async (token: string, code: string, password: string) => {
  // validate reset code
  const { id, resetCode } = await validateJwtToken(token, process.env.JWT_RESET!);

  if (resetCode !== code) {
    throw new BadRequestError('Invalid code');
  }

  // update password
  const { hashedPassword, salt, iterations } = await genHashedPassword(password);
  await prisma.user.update({
    data: { password: hashedPassword, salt, iterations },
    where: { id },
  });

  return true;
};

export const refreshToken = async (token: string) => {
  const { id } = await validateJwtToken(token, process.env.JWT_REFRESH!);
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const accessToken = Jwt.signJwt({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
  return {
    expiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
    accessToken: accessToken,
  };
};

export const validateJwtToken = async (token: string, secret: string) => {
  try {
    return Jwt.verifyJwt(token, secret);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }
    throw new UnauthorizedError('Invalid token');
  }
};
