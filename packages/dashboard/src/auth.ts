import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { LoginRequest, LoginResponse } from '@resala/shared';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import { authConfig } from './auth.config';
import { callEndpoint } from './services/callEndpoint';
import { setCookie } from './utils/cookies';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      credentials: {
        sign: { type: 'text' },
        password: { type: 'password' },
      },
      // @ts-expect-error - We don't need to define the types for this function
      authorize: async credentials => {
        try {
          const { data } = await callEndpoint<LoginRequest, LoginResponse>(ENDPOINT_CONFIGS.login, {
            body: credentials as LoginRequest['body'],
          });

          if (!['MODERATOR', 'ADMIN'].includes(data.user.role)) {
            throw new Error('You are not authorized to access this page');
          }

          setCookie('refresh-token', { token: data.refreshToken });

          return data;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
});
