'use server';

import ROUTES from '@/lib/routes';
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

import { callEndpoint } from '../lib/fetch';
import { createSession, deleteSession } from '../lib/session';

export const login = async (payload: LoginRequest['body']) => {
  const response = await callEndpoint<LoginRequest, LoginResponse>(ENDPOINT_CONFIGS.login, {
    body: payload,
  });

  if (![Role.ADMIN, Role.MODERATOR].includes(response.data.user.role as Role)) {
    throw new Error('You are not authorized to access this page');
  }

  createSession(response.data.accessToken, new Date(response.data.expiresAt));

  redirect(ROUTES.DASHBOARD, RedirectType.replace);
};

export const logout = async () => {
  deleteSession();
  redirect(ROUTES.LOGIN, RedirectType.replace);
};

export const forgotPassword = async (payload: ForgotPasswordRequest['body']) => {
  const response = await callEndpoint<ForgotPasswordRequest, ForgotPasswordResponse>(
    ENDPOINT_CONFIGS.forgotPassword,
    { body: payload }
  );

  createSession(response.data.resetToken, new Date(response.data.expiresAt));

  redirect(ROUTES.RESET_PASSWORD, RedirectType.replace);
};

export const resetPassword = async (payload: ResetPasswordRequest['body']) => {
  await callEndpoint<ResetPasswordRequest, ResetPasswordResponse>(ENDPOINT_CONFIGS.resetPassword, {
    body: payload,
  });

  deleteSession();

  redirect(ROUTES.LOGIN, RedirectType.replace);
};
