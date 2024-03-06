import { UserSchema } from '@resala/shared';
import zod from 'zod';

import { BadRequestError } from '../../lib/error';
import { ChangePassword, ForgotPassword, Login, Register, ResetPassword } from './auth-types';

export const validateRegistration: Register = (req, _, next) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return next(new BadRequestError('Email, password, first name and last name are required'));
  }

  const RegisterSchema = UserSchema.pick({
    email: true,
    password: true,
    firstName: true,
    lastName: true,
  });

  const validatedFields = RegisterSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateLogin: Login = (req, _, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError('Email and password are required'));
  }

  const LoginSchema = UserSchema.pick({
    email: true,
    password: true,
  });
  const validatedFields = LoginSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateForgotPassword: ForgotPassword = (req, _, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new BadRequestError('Email is required'));
  }

  const ForgotPasswordSchema = UserSchema.pick({
    email: true,
  });
  const validatedFields = ForgotPasswordSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateResetPassword: ResetPassword = (req, _, next) => {
  const { code, email, password } = req.body;
  if (!code || !email || !password) {
    return next(new BadRequestError('Code, email and password are required'));
  }

  const ResetPasswordSchema = zod.object({
    code: zod.string().length(6),
    email: UserSchema.shape.email,
    password: UserSchema.shape.password,
  });
  const validatedFields = ResetPasswordSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateChangePassword: ChangePassword = (req, _, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(new BadRequestError('old password and new password are required'));
  }

  const ChangePasswordSchema = zod.object({
    oldPassword: UserSchema.shape.password,
    newPassword: UserSchema.shape.password,
  });
  const validatedFields = ChangePasswordSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};
