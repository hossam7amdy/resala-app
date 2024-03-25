import { ChangePasswordSchema, ResetPasswordSchema, UserSchema } from '@resala/shared';
import { ZodError } from 'zod';

import { ChangePassword, ForgotPassword, Login, Register, ResetPassword } from '../../types';
import { BadRequestError } from '../../utils/api-errors';
import { formatZodError } from '../../utils/zod-errors';

export const validateLogin: Login = (req, _, next) => {
  try {
    const { sign, password } = req.body;
    if (!sign || !password) {
      throw new BadRequestError('Email and password are required');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateRegistration: Register = (req, _, next) => {
  try {
    const RegisterSchema = UserSchema.pick({
      email: true,
      phone: true,
      password: true,
      firstName: true,
      lastName: true,
    });

    req.body = RegisterSchema.parse(req.body);

    next();
  } catch (error) {
    next(new BadRequestError(formatZodError(error as ZodError)));
  }
};

export const validateForgotPassword: ForgotPassword = (req, _, next) => {
  try {
    const ForgotPasswordSchema = UserSchema.pick({
      email: true,
    });

    req.body = ForgotPasswordSchema.parse(req.body);

    next();
  } catch (error) {
    next(new BadRequestError(formatZodError(error as ZodError)));
  }
};

export const validateResetPassword: ResetPassword = (req, _, next) => {
  try {
    const resetToken = req.headers.authorization?.split(' ')[1];
    if (!resetToken) {
      throw new BadRequestError('token: Required');
    }

    req.body = ResetPasswordSchema.parse(req.body);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      next(new BadRequestError(formatZodError(error)));
    }

    next(error);
  }
};

export const validateChangePassword: ChangePassword = (req, _, next) => {
  try {
    req.body = ChangePasswordSchema.parse(req.body);

    next();
  } catch (error) {
    next(new BadRequestError(formatZodError(error as ZodError)));
  }
};
