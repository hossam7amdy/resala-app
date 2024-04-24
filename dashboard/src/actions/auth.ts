'use server';

import ROUTES from '@/lib/routes';
import { ENDPOINT_CONFIGS, ROLE } from '@resala/shared';
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
  try {
    const response = await callEndpoint<LoginRequest, LoginResponse>(ENDPOINT_CONFIGS.login, {
      body: payload,
    });

    if (![ROLE.ADMIN, ROLE.MODERATOR].includes(response.data.user.role as ROLE)) {
      return {
        success: false,
        message: 'You are not allowed to access this page',
      } as LoginResponse;
    }

    createSession(response.data.accessToken, new Date(response.data.expiresAt));
  } catch (error) {
    return error as LoginResponse;
  }

  redirect(ROUTES.DASHBOARD, RedirectType.replace);
};

export const logout = async () => {
  deleteSession();
  redirect(ROUTES.LOGIN, RedirectType.replace);
};

export const forgotPassword = async (payload: ForgotPasswordRequest['body']) => {
  try {
    const response = await callEndpoint<ForgotPasswordRequest, ForgotPasswordResponse>(
      ENDPOINT_CONFIGS.forgotPassword,
      { body: payload }
    );

    createSession(response.data.resetToken, new Date(response.data.expiresAt));
  } catch (error) {
    return error as ForgotPasswordResponse;
  }

  redirect(ROUTES.RESET_PASSWORD, RedirectType.replace);
};

export const resetPassword = async (payload: ResetPasswordRequest['body']) => {
  try {
    await callEndpoint<ResetPasswordRequest, ResetPasswordResponse>(
      ENDPOINT_CONFIGS.resetPassword,
      { body: payload }
    );

    deleteSession();
  } catch (error) {
    return error as ResetPasswordResponse;
  }

  redirect(ROUTES.LOGIN, RedirectType.replace);
};
