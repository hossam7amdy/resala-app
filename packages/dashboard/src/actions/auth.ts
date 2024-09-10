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

import { callEndpoint } from '../fetch';

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
          return { success: false, statusCode: 400, message: 'Invalid email or password' };
        default:
          return { success: false, statusCode: 400, message: error.message };
      }
    }
    throw error;
  }
};

export const refreshToken = async (refreshToken: string) => {
  return await callEndpoint<RefreshTokenRequest, RefreshTokenResponse>(ENDPOINT_CONFIGS.refresh, {
    body: { token: refreshToken },
  });
};

export const logout = async () => {
  await signOut({ redirectTo: ROUTES.LOGIN });
};

export const verifyEmail = async ({ token }: { token: string }) => {
  const response = await callEndpoint<VerifyEmailRequest, VerifyEmailResponse>(
    ENDPOINT_CONFIGS.verifyEmail,
    { body: {}, headers: { Authorization: `Bearer ${token}` } }
  );

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
  const response = await callEndpoint<ResetPasswordRequest, ResetPasswordResponse>(
    ENDPOINT_CONFIGS.resetPassword,
    {
      body: { newPassword, confirmNewPassword },
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response;
};

export const resendVerificationEmail = async (email: string) => {
  return await callEndpoint<VerifyEmailRequest, VerifyEmailResponse>(
    ENDPOINT_CONFIGS.resendEmailVerification,
    { body: { email } }
  );
};
