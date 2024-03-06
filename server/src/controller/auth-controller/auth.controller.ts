import { BadRequestError, ConflictError, NotFoundError } from '../../lib/error';
import { signJwt, verifyJwt } from '../../lib/jwt-token';
import { logger } from '../../lib/logger';
import { sendResetPasswordEmail, sendVerificationEmail } from '../../lib/mailer';
import { prisma } from '../../model';
import { genHashedPassword, verifyHashedPassword } from '../../utils/password';
import { generateRandomString } from '../../utils/random';
import {
  ChangePassword,
  ForgotPassword,
  Login,
  Register,
  ResendVerificationEmail,
  ResetPassword,
  VerifyEmail,
} from './auth-types';

export const login: Login = async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await prisma.user.findUnique({ where: { email } });
  if (!userExist) {
    return next(new NotFoundError('This email is not registered'));
  }

  const verified = await verifyHashedPassword({
    password: password!,
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

export const register: Register = async (req, res, next) => {
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

export const verifyEmail: VerifyEmail = async (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return next(new BadRequestError('Token is required'));
  }

  let email = '';
  try {
    email = verifyJwt(token).email;
    if (!email) throw new Error();
  } catch (e) {
    logger.warn(e);
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
    message: 'Email verified successfully',
    data: undefined,
  });
};

export const forgotPassword: ForgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const resetCode = generateRandomString(6).slice(0, 6).toUpperCase();
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
    message: 'Reset code is sent to your email',
    data: undefined,
  });
};

export const resetPassword: ResetPassword = async (req, res, next) => {
  const { email, code, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  try {
    const { resetCode } = verifyJwt(user.token || '');
    if (code !== resetCode) throw 'Invalid code';
  } catch (err) {
    logger.warn(err);
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
    message: 'Password updated successfully',
    data: undefined,
  });
};

export const changePassword: ChangePassword = async (req, res, next) => {
  const userId = res.locals.id;
  const { oldPassword, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  const verified = await verifyHashedPassword({
    password: oldPassword,
    salt: user.salt,
    iterations: user.iterations,
    hashedPassword: user.password,
  });
  if (!verified) {
    return next(new BadRequestError('Old password is incorrect'));
  }

  const { hashedPassword, salt, iterations } = await genHashedPassword(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword, salt, iterations },
  });

  return res.json({
    success: true,
    message: 'Password changed successfully',
    data: undefined,
  });
};

export const resendVerificationEmail: ResendVerificationEmail = async (_, res, next) => {
  const email = res.locals.email;
  const user = await prisma.user.findUnique({
    where: { email },
    select: { isVerified: true },
  });
  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  if (user.isVerified) {
    return next(new BadRequestError('User is already verified'));
  }

  const token = signJwt({ id: '', email });
  await sendVerificationEmail(email, token);

  return res.json({
    success: true,
    message: 'Verification email sent successfully',
    data: undefined,
  });
};
