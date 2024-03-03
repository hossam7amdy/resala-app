import { RequestHandler } from 'express';

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

export const login: RequestHandler = async (req, res) => {
  const error = validateLoginData(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { email, password } = req.body;
  const userExist = await prisma.user.findUnique({ where: { email } });
  if (!userExist) {
    throw new NotFoundError('This email is not registered');
  }

  const verified = await verifyHashedPassword({
    password: password,
    salt: userExist.salt,
    iterations: userExist.iterations,
    hashedPassword: userExist.password,
  });
  if (!verified) {
    throw new BadRequestError('Invalid email or password');
  }

  const user = await prisma.user.update({
    where: { id: userExist.id },
    data: { lastLogin: new Date() },
    select: { id: true },
  });

  return res.json({
    success: true,
    message: 'Login successful',
    data: {
      accessToken: signJwt({ id: user.id, email }, { expiresIn: '1d' }),
    },
  });
};

export const register: RequestHandler = async (req, res) => {
  const error = validateRegistrationData(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const userExist = await prisma.user.findUnique({ where: { email: req.body.email } });
  if (userExist) {
    throw new ConflictError('Email already registered');
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
    message: 'Registration successful',
    data: {
      accessToken: signJwt({ id: user.id, email }, { expiresIn: '1d' }),
    },
  });
};

export const verifyEmail: RequestHandler = async (req, res) => {
  const token = req.query.token as string;
  if (!token) {
    throw new BadRequestError('Token is required');
  }

  const { email } = verifyJwt(token);
  if (!email) {
    throw new BadRequestError('Invalid token');
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, isVerified: true },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }
  if (user.isVerified) {
    throw new BadRequestError('Email already verified');
  }

  await prisma.user.update({
    data: { isVerified: true },
    where: { id: user.id },
  });

  return res.json({
    success: true,
    message: 'Email verified successfully',
  });
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const error = validateForgotPasswordData(req.body);
  if (error) {
    throw new BadRequestError(error);
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
    throw new NotFoundError('User not found');
  }

  await sendResetPasswordEmail(email, resetCode);

  return res.json({
    success: true,
    message: 'Reset code is sent to your email',
  });
};

export const resetPassword: RequestHandler = async (req, res) => {
  const error = validateResetPasswordData(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { email, code, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  try {
    const { resetCode } = verifyJwt(user.token || '');
    if (code !== resetCode) {
      throw new Error();
    }
  } catch (err) {
    throw new BadRequestError('Invalid code');
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
    message: 'Password updated successfully',
  });
};
