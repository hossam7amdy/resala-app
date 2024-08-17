import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@resala/shared';

import type { ExpressHandler, LocalUser } from '../../types/index.js';

export interface IAuthController {
  login: Login;
  register: Register;
  refresh: Refresh;
  verifyEmail: VerifyEmail;
  forgotPassword: ForgotPassword;
  resetPassword: ResetPassword;
  changePassword: ChangePassword;
  resendVerificationEmail: ResendVerificationEmail;
}

export type Login = ExpressHandler<LoginRequest['body'], LoginResponse>;
export type Register = ExpressHandler<RegisterRequest['body'], RegisterResponse>;
export type Refresh = ExpressHandler<RefreshTokenRequest['body'], RefreshTokenResponse>;
export type ForgotPassword = ExpressHandler<ForgotPasswordRequest['body'], ForgotPasswordResponse>;
export type ResetPassword = ExpressHandler<ResetPasswordRequest['body'], ResetPasswordResponse>;
export type VerifyEmail = ExpressHandler<
  undefined,
  VerifyEmailResponse,
  VerifyEmailRequest['query']
>;
export type ChangePassword = ExpressHandler<
  ChangePasswordRequest['body'],
  ChangePasswordResponse,
  undefined,
  LocalUser
>;
export type ResendVerificationEmail = ExpressHandler<
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  undefined,
  LocalUser
>;
