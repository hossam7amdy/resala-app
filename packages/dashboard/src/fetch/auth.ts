import {
  forgetPassword as handleForgetPassword,
  resetPassword as handleResetPassword,
  verifyEmail as handleVerifyEmail,
  sendVerificationEmail,
  signIn,
  signOut,
} from '@/lib/auth.client';
import { ROUTES } from '@/routes';

export const login = async ({ sign, password }: { sign: string; password: string }) => {
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

export const forgetPassword = async ({
  email,
  redirectUrl,
}: {
  email: string;
  redirectUrl?: string;
}) => {
  return handleForgetPassword({ email, redirectTo: redirectUrl });
};

export const resetPassword = async ({
  token,
  newPassword,
}: {
  newPassword: string;
  token: string;
}) => {
  return handleResetPassword({ token, newPassword });
};

export const resendVerificationEmail = async ({ email }: { email: string }) => {
  return sendVerificationEmail({ email });
};
