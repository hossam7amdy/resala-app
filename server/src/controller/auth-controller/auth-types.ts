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

import { LocalUser } from '../../types';

export type Login = RequestHandler<undefined, LoginResponse, LoginRequest, undefined, {}>;

export type Register = RequestHandler<undefined, RegisterResponse, RegisterRequest, undefined, {}>;

export type VerifyEmail = RequestHandler<
  undefined,
  VerifyEmailResponse,
  VerifyEmailRequest,
  undefined,
  {}
>;

export type ForgotPassword = RequestHandler<
  undefined,
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  undefined,
  {}
>;

export type ResetPassword = RequestHandler<
  undefined,
  ResetPasswordResponse,
  ResetPasswordRequest,
  undefined,
  {}
>;

export type ChangePassword = RequestHandler<
  undefined,
  ChangePasswordResponse,
  ChangePasswordRequest,
  undefined,
  LocalUser
>;

export type ResendVerificationEmail = RequestHandler<
  undefined,
  ResendVerificationEmailResponse,
  ResendVerificationEmailRequest,
  undefined,
  LocalUser
>;
