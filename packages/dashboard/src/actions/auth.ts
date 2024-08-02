'use server';

import { Token } from '@/utils/enums';
import ROUTES from '@/utils/routes';
import { ENDPOINT_CONFIGS, Role } from '@resala/shared';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@resala/shared';
import { RedirectType, redirect } from 'next/navigation';

import { callEndpoint } from '../services/callEndpoint';
import { deleteCookie, setCookie } from '../utils/cookies';

export const login = async (payload: LoginRequest['body']) => {
  const { data } = await callEndpoint<LoginRequest, LoginResponse>(ENDPOINT_CONFIGS.login, {
    body: payload,
  });

  if (![Role.ADMIN, Role.MODERATOR].includes(data.user.role as Role)) {
    throw new Error('You are not authorized to access this page');
  }

  setCookie(Token.Access, {
    token: data.accessToken,
    expireDate: data.expiresAt.toString(),
  });

  setCookie(Token.Refresh, {
    token: data.refreshToken,
  });

  redirect(ROUTES.DASHBOARD, RedirectType.replace);
};

export const logout = async () => {
  deleteCookie(Token.Access);

  redirect(ROUTES.LOGIN, RedirectType.replace);
};

export const forgotPassword = async (payload: ForgotPasswordRequest['body']) => {
  const { data } = await callEndpoint<ForgotPasswordRequest, ForgotPasswordResponse>(
    ENDPOINT_CONFIGS.forgotPassword,
    { body: payload }
  );

  setCookie(Token.Access, {
    token: data.resetToken,
    expireDate: data.expiresAt.toString(),
  });

  redirect(ROUTES.RESET_PASSWORD, RedirectType.replace);
};

export const resetPassword = async (payload: ResetPasswordRequest['body']) => {
  await callEndpoint<ResetPasswordRequest, ResetPasswordResponse>(ENDPOINT_CONFIGS.resetPassword, {
    body: payload,
  });

  deleteCookie(Token.Access);

  redirect(ROUTES.LOGIN, RedirectType.replace);
};
