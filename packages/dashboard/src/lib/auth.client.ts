import { configuration } from '@/configuration';
import { adminClient, phoneNumberClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const {
  signOut,
  verifyEmail,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
  useSession,
  updateUser,
  signIn,
} = createAuthClient({
  baseURL: configuration().baseUrl,
  plugins: [adminClient(), phoneNumberClient()],
});
