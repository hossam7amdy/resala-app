import { ChangePasswordSchema, ResetPasswordSchema, UserSchema } from '@resala/shared';

import { ChangePassword, ForgotPassword, Login, Register, ResetPassword } from '../../types';
import { BadRequestError } from '../../utils/api-errors';

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
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
      throw new BadRequestError('Email, password, first name and last name are required');
    }

    const RegisterSchema = UserSchema.pick({
      email: true,
      password: true,
      firstName: true,
      lastName: true,
    });

    const validatedFields = RegisterSchema.safeParse(req.body);
    if (!validatedFields.success) {
      throw new BadRequestError(validatedFields.error.issues[0].message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateForgotPassword: ForgotPassword = (req, _, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new BadRequestError('Email is required');
    }

    const ForgotPasswordSchema = UserSchema.pick({
      email: true,
    });
    const validatedFields = ForgotPasswordSchema.safeParse(req.body);
    if (!validatedFields.success) {
      throw new BadRequestError(validatedFields.error.issues[0].message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateResetPassword: ResetPassword = (req, _, next) => {
  try {
    const { code, email, password } = req.body;
    const resetToken = req.headers.authorization?.split(' ')[1];

    if (!resetToken || !code || !email || !password) {
      throw new BadRequestError('code, token, email and password are required');
    }

    const validatedFields = ResetPasswordSchema.safeParse(req.body);
    if (!validatedFields.success) {
      throw new BadRequestError(validatedFields.error.issues[0].message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateChangePassword: ChangePassword = (req, _, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new BadRequestError('old password and new password are required');
    }

    const validatedFields = ChangePasswordSchema.safeParse(req.body);
    if (!validatedFields.success) {
      throw new BadRequestError(validatedFields.error.issues[0].message);
    }

    next();
  } catch (error) {
    next(error);
  }
};
