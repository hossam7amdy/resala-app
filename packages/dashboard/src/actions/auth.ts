'use server';

import { signIn, signOut } from '@/auth';
import { ROUTES } from '@/utils/routes';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@resala/shared';
import { AuthError } from 'next-auth';

import { callEndpoint } from '../services/callEndpoint';
import { deleteCookie, setCookie } from '../utils/cookies';

export const login = async (payload: LoginRequest['body']) => {
  try {
    await signIn('credentials', {
      ...payload,
      redirectTo: ROUTES.DASHBOARD,
    });
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
  await signOut({ redirectTo: ROUTES.LOGIN });
};

export const verifyEmail = async ({ token }: { token: string }) => {
  setCookie('jwt-token', { token });

  const response = await callEndpoint<VerifyEmailRequest, VerifyEmailResponse>(
    ENDPOINT_CONFIGS.verifyEmail
  );

  deleteCookie('jwt-token');

  return response;
};

export const forgotPassword = async (payload: ForgotPasswordRequest['body']) => {
  return callEndpoint<ForgotPasswordRequest, ForgotPasswordResponse>(
    ENDPOINT_CONFIGS.forgotPassword,
    { body: payload }
  );
};

export const resetPassword = async ({
  token,
  newPassword,
  confirmNewPassword,
}: ResetPasswordRequest['body'] & { token: string }) => {
  setCookie('jwt-token', { token });

  const response = await callEndpoint<ResetPasswordRequest, ResetPasswordResponse>(
    ENDPOINT_CONFIGS.resetPassword,
    {
      body: { newPassword, confirmNewPassword },
    }
  );

  deleteCookie('jwt-token');

  return response;
};
