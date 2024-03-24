import { RegisterRequest } from '@resala/shared';
import { TokenExpiredError } from 'jsonwebtoken';

import { ENV } from '../config';
import { signJwt, verifyJwt } from '../lib/jwt-token';
import { prisma } from '../model';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/api-errors';
import { genHashedPassword, verifyHashedPassword } from '../utils/password';
import { generateRandomString } from '../utils/random';

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

  await prisma.user.update({
    data: { lastLogin: new Date() },
    where: { id: user.id },
  });

  const accessToken = await generateAccessToken(user.id, user.email);
  const refreshToken = await generateRefreshToken(user.id, user.email);

  return {
    expiresIn: accessToken.expiresIn,
    accessToken: accessToken.token,
    refreshToken: refreshToken.token,
  };
};

export const register = async (payload: RegisterRequest) => {
  const duplicate = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (duplicate) {
    throw new ConflictError('Email already registered');
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

  const verifyToken = await generateVerifyToken(user.id, user.email);

  return {
    user,
    verifyToken,
  };
};

export const verifyEmail = async (email: string, token: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (email !== verifyJwt(token, 'VERIFY').email) {
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
  return generateResetToken(user.id, user.email);
};

export const resetPassword = async (token: string, code: string, password: string) => {
  // validate reset code
  const { id, resetCode } = await verifyResetToken(token);

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
  const { id } = await verifyRefreshToken(token);
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const accessToken = await generateAccessToken(user.id, user.email);
  return {
    expiresIn: accessToken.expiresIn,
    accessToken: accessToken.token,
  };
};

export const generateResetToken = async (userId: number, email: string) => {
  const expiresIn = 60 * 60; // 1 hour
  const resetCode = generateRandomString(6).toUpperCase();
  const token = signJwt({ id: userId, email, resetCode }, ENV.JWT_RESET!, { expiresIn: '1h' });

  return { expiresIn, token, resetCode };
};

export const generateVerifyToken = async (userId: number, email: string) => {
  const expiresIn = 60 * 60 * 24 * 30; // 30 days
  const token = signJwt({ id: userId, email }, ENV.JWT_VERIFY!, { expiresIn: '30d' });

  return { expiresIn, token };
};

export const generateRefreshToken = async (userId: number, email: string) => {
  const expiresIn = 60 * 60 * 24 * 7; // 7 days
  const token = signJwt({ id: userId, email }, ENV.JWT_REFRESH!, { expiresIn: '7d' });

  return { expiresIn, token };
};

export const generateAccessToken = async (userId: number, email: string) => {
  const expiresIn = 60 * 60 * 24; // 1 day
  const token = signJwt({ id: userId, email }, ENV.JWT_SECRET!, { expiresIn: '1d' });

  return { expiresIn, token };
};

export const verifyAccessToken = async (token: string) => {
  try {
    const data = verifyJwt(token, ENV.JWT_SECRET!);
    return data;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }
    throw new UnauthorizedError('Invalid token');
  }
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const data = verifyJwt(token, ENV.JWT_REFRESH!);
    return data;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }
    throw new UnauthorizedError('Invalid token');
  }
};

export const verifyResetToken = async (token: string) => {
  try {
    const data = verifyJwt(token, ENV.JWT_RESET!);
    return data;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }
    throw new UnauthorizedError('Invalid token');
  }
};

export const verifyVerificationToken = async (token: string) => {
  try {
    const data = verifyJwt(token, ENV.JWT_VERIFY!);
    return data;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }
    throw new UnauthorizedError('Invalid token');
  }
};
