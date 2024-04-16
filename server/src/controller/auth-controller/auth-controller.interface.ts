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

import { ExpressHandler, LocalUser } from '../../types';

export interface Login extends ExpressHandler<LoginRequest['body'], LoginResponse> {}

export interface Register extends ExpressHandler<RegisterRequest['body'], RegisterResponse> {}

export interface VerifyEmail
  extends ExpressHandler<{}, VerifyEmailResponse, VerifyEmailRequest['query']> {}

export interface ForgotPassword
  extends ExpressHandler<ForgotPasswordRequest['body'], ForgotPasswordResponse> {}

export interface ResetPassword
  extends ExpressHandler<ResetPasswordRequest['body'], ResetPasswordResponse> {}

export interface ChangePassword
  extends ExpressHandler<ChangePasswordRequest['body'], ChangePasswordResponse, {}, LocalUser> {}

export interface ResendVerificationEmail
  extends ExpressHandler<
    ResendVerificationEmailRequest,
    ResendVerificationEmailResponse,
    {},
    LocalUser
  > {}
