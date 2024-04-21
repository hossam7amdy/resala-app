'use server';

import {
  ENDPOINT_CONFIGS,
  GetProfileRequest,
  GetProfileResponse,
  LoginRequest,
  LoginResponse,
  ROLE,
} from '@resala/shared';
import { AxiosResponse } from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { client, fetch } from './app/lib/fetch';
import { authConfig } from './auth.config';

const getUser = async (token: string) => {
  const { method, url } = ENDPOINT_CONFIGS.getCurrentUser;
  const profile = await client<GetProfileRequest, AxiosResponse<GetProfileResponse>>({
    url,
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return profile.data.data;
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const token = await fetch<LoginRequest, LoginResponse>(ENDPOINT_CONFIGS.login, {
            body: {
              sign: credentials.sign as string,
              password: credentials.password as string,
            },
          });

          const user = await getUser(token.data.accessToken);

          // @ts-expect-error
          if (![ROLE.ADMIN, ROLE.MODERATOR].includes(user.role.toUpperCase())) {
            return null;
          }

          return {
            ...user,
            id: user.id.toString(),
            token: token.data,
          };
        } catch (error) {
          return null; // Return User | null
        }
      },
    }),
  ],
});
