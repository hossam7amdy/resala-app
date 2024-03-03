import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@resala/shared';

import { ExpressHandler } from '../../definition/types';
import { BadRequestError, ConflictError, NotFoundError } from '../../lib/error';
import { signJwt, verifyJwt } from '../../lib/jwt-token';
import { logger } from '../../lib/logger';
import { sendResetPasswordEmail, sendVerificationEmail } from '../../lib/mailer';
import { prisma } from '../../model';
import { genHashedPassword, verifyHashedPassword } from '../../utils/password';
import random from '../../utils/random';
import {
  validateForgotPasswordData,
  validateLoginData,
  validateRegistrationData,
  validateResetPasswordData,
} from './auth.validator';

export const login: ExpressHandler<LoginRequest, LoginResponse> = async (req, res, next) => {
  const error = validateLoginData(req.body);
  if (error) {
    return next(new BadRequestError(error));
  }

  const { email, password } = req.body;
  const userExist = await prisma.user.findUnique({ where: { email } });
  if (!userExist) {
    return next(new NotFoundError('This email is not registered'));
  }

  const verified = await verifyHashedPassword({
    password: password,
    salt: userExist.salt,
    iterations: userExist.iterations,
    hashedPassword: userExist.password,
  });
  if (!verified) {
    return next(new BadRequestError('Invalid email or password'));
  }

  const user = await prisma.user.update({
    where: { id: userExist.id },
    data: { lastLogin: new Date() },
    select: { id: true },
  });

  return res.json({
    success: true,
    data: {
      accessToken: signJwt({ id: user.id, email }, { expiresIn: '1d' }),
    },
  });
};

export const register: ExpressHandler<RegisterRequest, RegisterResponse> = async (
  req,
  res,
  next
) => {
  const error = validateRegistrationData(req.body);
  if (error) {
    return next(new BadRequestError(error));
  }

  const userExist = await prisma.user.findUnique({ where: { email: req.body.email } });
  if (userExist) {
    return next(new ConflictError('Email already registered'));
  }

  const { email, password, firstName, lastName } = req.body;
  const { hashedPassword, salt, iterations } = await genHashedPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      salt: salt,
      iterations,
    },
  });

  const token = signJwt({ id: '', email });
  sendVerificationEmail(email, token).catch(logger.warn);

  return res.status(201).json({
    success: true,
    data: {
      accessToken: signJwt({ id: user.id, email }, { expiresIn: '1d' }),
    },
  });
};

export const verifyEmail: ExpressHandler<any, any> = async (req, res, next) => {
  const token = req.query.token as string;
  if (!token) {
    return next(new BadRequestError('Token is required'));
  }

  const { email } = verifyJwt(token);
  if (!email) {
    return next(new BadRequestError('Invalid token'));
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, isVerified: true },
  });
  if (!user) {
    return next(new NotFoundError('User not found'));
  }
  if (user.isVerified) {
    return next(new BadRequestError('Email already verified'));
  }

  await prisma.user.update({
    data: { isVerified: true },
    where: { id: user.id },
  });

  return res.json({
    success: true,
    data: {
      message: 'Email verified successfully',
    },
  });
};

export const forgotPassword: ExpressHandler<any, any> = async (req, res, next) => {
  const error = validateForgotPasswordData(req.body);
  if (error) {
    return next(new BadRequestError(error));
  }

  const { email } = req.body;
  const resetCode = random.generateRandomString(6).slice(0, 6).toUpperCase();
  const token = signJwt({ id: '', email, resetCode }, { expiresIn: '10m' });

  try {
    await prisma.user.update({
      data: { token },
      where: { email },
    });
  } catch (error) {
    return next(new NotFoundError('User not found'));
  }

  await sendResetPasswordEmail(email, resetCode);

  return res.json({
    success: true,
    data: {
      message: 'Reset code is sent to your email',
    },
  });
};

export const resetPassword: ExpressHandler<any, any> = async (req, res, next) => {
  const error = validateResetPasswordData(req.body);
  if (error) {
    return next(new BadRequestError(error));
  }

  const { email, code, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  try {
    const { resetCode } = verifyJwt(user.token || '');
    if (code !== resetCode) {
      return next(new Error());
    }
  } catch (err) {
    return next(new BadRequestError('Invalid code'));
  }

  const { hashedPassword, salt, iterations } = await genHashedPassword(password);
  await prisma.user.update({
    data: {
      password: hashedPassword,
      salt,
      iterations,
      isVerified: true,
    },
    where: {
      id: user.id,
    },
  });

  return res.json({
    success: true,
    data: {
      message: 'Password updated successfully',
    },
  });
};
