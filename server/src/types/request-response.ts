import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@resala/shared';
import { RequestHandler } from 'express';

import { User } from '.';

interface LocalUser {
  user: Pick<
    User,
    | 'id'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'isVerified'
    | 'phone'
    | 'role'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
  >;
}

export interface Login
  extends RequestHandler<undefined, LoginResponse, LoginRequest, undefined, {}> {}

export interface Register
  extends RequestHandler<undefined, RegisterResponse, RegisterRequest, undefined, {}> {}

export interface VerifyEmail
  extends RequestHandler<undefined, VerifyEmailResponse, VerifyEmailRequest, undefined, {}> {}

export interface ForgotPassword
  extends RequestHandler<undefined, ForgotPasswordResponse, ForgotPasswordRequest, undefined, {}> {}

export interface ResetPassword
  extends RequestHandler<undefined, ResetPasswordResponse, ResetPasswordRequest, undefined, {}> {}

export interface ChangePassword
  extends RequestHandler<
    undefined,
    ChangePasswordResponse,
    ChangePasswordRequest,
    undefined,
    LocalUser
  > {}

export interface ResendVerificationEmail
  extends RequestHandler<
    undefined,
    ResendVerificationEmailResponse,
    ResendVerificationEmailRequest,
    undefined,
    LocalUser
  > {}
