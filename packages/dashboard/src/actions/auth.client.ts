import { configuration } from '@/configuration/client';
import { adminClient, phoneNumberClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const { useSession, signIn, forgetPassword, signOut, resetPassword, admin, changePassword } =
  createAuthClient({
    baseUrl: configuration().baseUrl,
    plugins: [adminClient(), phoneNumberClient()],
  });
