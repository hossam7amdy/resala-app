import type {
  ForgotPasswordRequest,
  LoginRequest,
  ResendVerificationEmailRequest,
  ResetPasswordRequest,
  User,
} from '@resala/shared';
import * as Auth from 'aws-amplify/auth';

export const getCurrentUser = async (): Promise<User> => {
  const user = await Auth.fetchUserAttributes();

  return {
    id: user.sub!,
    firstName: user.given_name!,
    lastName: user.family_name!,
    email: user.email!,
    phone: user.phone_number!,
    role: 'ADMIN',
    isEmailVerified: user.email_verified === 'true',
    isPhoneVerified: user.phone_number_verified === 'true',
    updatedAt: new Date(user.updated_at!),
    createdAt: new Date(),
    lastLogin: new Date(),
  };
};

export const login = (payload: LoginRequest['body']) => {
  return Auth.signIn({
    username: payload.sign,
    password: payload.password,
  });
};

export const logout = () => {
  return signOut();
};

export const verifyEmail = ({ token }: { token: string }) => {
  return Auth.confirmSignIn({
    challengeResponse: token,
  });
};

export const forgotPassword = (payload: ForgotPasswordRequest['body']) => {
  return Auth.resetPassword({ username: payload.email });
};

export const resetPassword = ({
  code,
  email,
  newPassword,
}: ResetPasswordRequest['body'] & { code: string; email: string }) => {
  return Auth.confirmResetPassword({ username: email, newPassword, confirmationCode: code });
};

export const resendVerificationEmail = (payload: ResendVerificationEmailRequest['body']) => {
  return Auth.resendSignUpCode({ username: payload.email });
};

export const signOut = (global: boolean = false) => {
  return Auth.signOut({ global });
};
