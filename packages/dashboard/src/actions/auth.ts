'use server';

import { signIn, signOut } from '@/auth';
import { httpClient } from '@/lib/http-client';
import { ROUTES } from '@/utils/routes';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@resala/shared';
import { AuthError } from 'next-auth';

import { APIError, callEndpoint } from '../fetch';

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
          throw new APIError(400, 'Invalid email or password');
        default:
          throw new APIError(500, error.message);
      }
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: ROUTES.LOGIN });
};

export const verifyEmail = async ({ token }: { token: string }) => {
  const { method, url } = ENDPOINT_CONFIGS.verifyEmail;

  const response = await httpClient<VerifyEmailRequest, VerifyEmailResponse>({
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

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
  const { method, url } = ENDPOINT_CONFIGS.resetPassword;

  const response = await httpClient<ResetPasswordRequest, ResetPasswordResponse>({
    url,
    method,
    data: { newPassword, confirmNewPassword },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const resendVerificationEmail = async (email: string) => {
  return await callEndpoint<VerifyEmailRequest, VerifyEmailResponse>(
    ENDPOINT_CONFIGS.resendEmailVerification,
    { body: { email } }
  );
};
