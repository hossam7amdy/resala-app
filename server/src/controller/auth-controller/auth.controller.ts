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
  const { sign, password } = req.body;
  const userExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: sign }, { phone: sign }],
    },
  });
  if (!userExist) {
    return next(new NotFoundError('User not registered'));
  }

  const verified = await verifyHashedPassword({
    password: password!,
    salt: userExist.salt,
    iterations: userExist.iterations,
    hashedPassword: userExist.password,
  });
  if (!verified) {
    return next(new BadRequestError('Invalid email/phone or password'));
  }

  const user = await prisma.user.update({
    where: { id: userExist.id },
    data: { lastLogin: new Date() },
    select: { id: true, email: true },
  });

  const accessToken = signJwt(
    { id: user.id, email: user.email },
    { type: 'ACCESS', expiresIn: '1d' }
  );
  const refreshToken = signJwt(
    { id: user.id, email: user.email },
    { type: 'REFRESH', expiresIn: '7d' }
  );

  return res.json({
    success: true,
    data: {
      expiresIn: 60 * 60 * 24, // 1 day
      accessToken,
      refreshToken,
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

  const token = signJwt(
    { id: -1, email },
    {
      type: 'VERIFY',
      expiresIn: '30d',
    }
  );
  sendVerificationEmail(email, token).catch(logger.warn);

  const accessToken = signJwt(
    { id: user.id, email: user.email },
    { type: 'ACCESS', expiresIn: '1d' }
  );
  const refreshToken = signJwt(
    { id: user.id, email: user.email },
    { type: 'REFRESH', expiresIn: '7d' }
  );

  return res.status(201).json({
    success: true,
    data: {
      expiresIn: 60 * 60 * 24, // 1 day
      accessToken,
      refreshToken,
    },
  });
};

export const verifyEmail: VerifyEmail = async (req, res, next) => {
  const { token, email } = req.body;

  try {
    if (!token || !email) {
      throw new Error();
    }

    if (email !== verifyJwt(token, 'VERIFY').email) {
      throw new Error();
    }

    await prisma.user.update({
      data: { isVerified: true },
      where: { email },
    });
  } catch (e) {
    logger.warn(e);
    return next(new BadRequestError('Invalid token'));
  }

  return res.json({
    success: true,
  });
};

export const forgotPassword: ForgotPassword = async (req, res) => {
  const { email } = req.body;
  const resetCode = generateRandomString(6).slice(0, 6).toUpperCase();

  const expiresIn = 60 * 10; // 10 minutes
  const resetToken = signJwt({ id: -1, email, resetCode }, { type: 'RESET', expiresIn: '10m' });

  await sendResetPasswordEmail(email, resetCode);

  return res.json({
    success: true,
    data: {
      expiresIn,
      resetToken,
    },
  });
};

export const resetPassword: ResetPassword = async (req, res, next) => {
  const { email, code, password } = req.body;
  const resetToken = req.headers.authorization?.split(' ')[1];

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  try {
    const { resetCode } = verifyJwt(resetToken || '', 'RESET');
    if (code !== resetCode) throw new Error();
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
  });
};

export const changePassword: ChangePassword = async (req, res, next) => {
  const userId = res.locals.user.id;
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
  });
};

export const resendVerificationEmail: ResendVerificationEmail = async (_, res, next) => {
  const email = res.locals.user.email;
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

  const token = signJwt(
    { id: -1, email },
    {
      type: 'VERIFY',
      expiresIn: '30d',
    }
  );
  await sendVerificationEmail(email, token);

  return res.json({
    success: true,
  });
};
