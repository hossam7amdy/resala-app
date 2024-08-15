'use server';

import { signIn, signOut } from '@/auth';
import { ROUTES } from '@/utils/routes';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@resala/shared';
import { AuthError } from 'next-auth';
import { RedirectType, redirect } from 'next/navigation';

import { callEndpoint } from '../services/callEndpoint';
import { deleteCookie, setCookie } from '../utils/cookies';

export const login = async (payload: LoginRequest['body']) => {
  try {
    await signIn('credentials', payload);

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error?.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Invalid phone/email or password',
          };
        default:
          return {
            success: false,
            message: 'An error occurred while logging in',
          };
      }
    }
    throw error;
  }
};

export const logout = async () => {
  deleteCookie('refresh-token');

  await signOut();
};

export const forgotPassword = async (payload: ForgotPasswordRequest['body']) => {
  const { data } = await callEndpoint<ForgotPasswordRequest, ForgotPasswordResponse>(
    ENDPOINT_CONFIGS.forgotPassword,
    { body: payload }
  );

  setCookie('jwt-token', {
    token: data.resetToken,
    expireDate: data.expiresAt.toString(),
  });

  redirect(ROUTES.RESET_PASSWORD, RedirectType.replace);
};

export const resetPassword = async (payload: ResetPasswordRequest['body']) => {
  await callEndpoint<ResetPasswordRequest, ResetPasswordResponse>(ENDPOINT_CONFIGS.resetPassword, {
    body: payload,
  });

  deleteCookie('jwt-token');

  redirect(ROUTES.LOGIN, RedirectType.replace);
};
