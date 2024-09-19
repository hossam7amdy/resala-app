import { ENDPOINT_CONFIGS, withParams } from '@resala/shared';
import type { GetUserResponse, JwtPayload, LoginRequest, LoginResponse } from '@resala/shared';
import { jwtDecode } from 'jwt-decode';
import NextAuth, { AuthError } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import { authConfig } from './auth.config';
import { configuration } from './configuration';
import { callEndpoint } from './fetch';

const loginWithCredentials = async (
  credentials: LoginRequest['body']
): Promise<LoginResponse['data']> => {
  const response = await callEndpoint<LoginRequest, LoginResponse>(ENDPOINT_CONFIGS.login, {
    body: credentials as LoginRequest['body'],
  });

  if (!response.success) {
    throw new AuthError(response.message);
  }

  return response.data;
};

const loginWithTokens = async (
  tokens: Pick<LoginResponse['data'], 'accessToken' | 'refreshToken'>
): Promise<LoginResponse['data']> => {
  const { id } = (jwtDecode(tokens.accessToken ?? '') ?? {}) as JwtPayload;

  const { url, method } = withParams(ENDPOINT_CONFIGS.getUser, id ?? '');
  const response = await fetch(`${configuration.baseUrl}${url}`, {
    method: method.toUpperCase(),
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  const data = (await response.json()) as GetUserResponse;

  if (!data.success) {
    throw new AuthError(data.message);
  }

  return { ...tokens, user: data.data };
};

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      credentials: {
        sign: { label: 'Sign', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        try {
          let data: LoginResponse['data'];
          if (credentials.sign && credentials.password) {
            data = await loginWithCredentials(credentials as LoginRequest['body']);
          } else {
            data = await loginWithTokens(credentials as LoginResponse['data']);
          }

          if (!['MODERATOR', 'ADMIN'].includes(data.user.role)) {
            throw new AuthError({ message: 'You are not authorized to access this page' });
          }

          return {
            ...data.user,
            id: data.user.id.toString(),
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } catch (e) {
          console.log('authorize error', e);
          return null;
        }
      },
    }),
  ],
});
