import { ENDPOINT_CONFIGS } from '@resala/shared';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import { authConfig } from './auth.config';
import { Endpoint } from './services/callEndpoint';
import { setCookie } from './utils/cookies';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      credentials: {
        sign: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async credentials => {
        try {
          const { method, url } = ENDPOINT_CONFIGS.login;
          const { data } = await Endpoint({ method, url, data: credentials });

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
