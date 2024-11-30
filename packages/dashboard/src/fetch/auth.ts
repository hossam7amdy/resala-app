import {
  forgetPassword as handleForgetPassword,
  resetPassword as handleResetPassword,
  verifyEmail as handleVerifyEmail,
  sendVerificationEmail,
  signIn,
  signOut,
} from '@/lib/auth.client';
import { ROUTES } from '@/routes';
import type {
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  SendVerificationEmailRequest,
} from '@resala/shared';

export const login = async ({ sign, password }: LoginRequest['body']) => {
  return signIn.email({
    email: sign,
    password,
    callbackURL: location.origin + ROUTES.DASHBOARD,
  });
};

export const loginWithProvider = async () => {
  return signIn.social({
    provider: 'google',
    callbackURL: location.origin + ROUTES.DASHBOARD,
  });
};

export const logout = async () => {
  return signOut({
    fetchOptions: {
      onSuccess: () => {
        location.reload();
      },
    },
  });
};

export const verifyEmail = async ({ token }: { token: string }) => {
  return handleVerifyEmail({ query: { token } });
};

export const forgetPassword = async ({ email, redirectUrl }: ForgotPasswordRequest['body']) => {
  return handleForgetPassword({ email, redirectTo: redirectUrl });
};

export const resetPassword = async ({
  token,
  newPassword,
}: ResetPasswordRequest['body'] & { token: string }) => {
  return handleResetPassword({ token, newPassword });
};

export const resendVerificationEmail = async ({ email }: SendVerificationEmailRequest['body']) => {
  return sendVerificationEmail({ email });
};
