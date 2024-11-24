'use server';

import { ENDPOINT_CONFIGS } from '@resala/shared';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@resala/shared';

import { callEndpoint } from '.';

export const login = async (_payload: LoginRequest['body']) => {};

export const logout = async () => {};

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

export const resendVerificationEmail = async (payload: ResendVerificationEmailRequest['body']) => {
  return await callEndpoint<ResendVerificationEmailRequest, ResendVerificationEmailResponse>(
    ENDPOINT_CONFIGS.resendEmailVerification,
    { body: payload }
  );
};
