import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { RefreshTokenRequest, RefreshTokenResponse } from '@resala/shared';
import { jwtDecode } from 'jwt-decode';
import type { NextAuthConfig } from 'next-auth';

import { PROTECTED_ROUTES, ROUTES } from './utils/routes';

export const refreshToken = async (refreshToken: string) => {
  const baseURL = process.env.API_HOST;

  const body: RefreshTokenRequest['body'] = { token: refreshToken };

  const { method, url } = ENDPOINT_CONFIGS.refresh;

  const response = await fetch(`${baseURL}${url}`, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data as RefreshTokenResponse;
};

export const isValidToken = (token: string = '') => {
  if (!token) return false;

  const jwtExpireTimestamp = jwtDecode(token).exp ?? 0;

  const jwtExpireDateTime = new Date(jwtExpireTimestamp * 1000);

  if (jwtExpireDateTime < new Date()) {
    return false;
  }

  return true;
};

export const authConfig = {
  pages: {
    signIn: ROUTES.LOGIN,
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;

      const isValid = isValidToken(auth?.accessToken);

      if (!isValid) {
        return false;
      }

      const isOnDashboard = PROTECTED_ROUTES.some(route => nextUrl.pathname.startsWith(route));

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(ROUTES.DASHBOARD, nextUrl));
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      const isValid = isValidToken(token.accessToken as string);
      if (isValid) return { ...token, ...user };

      if (!token.refreshToken) {
        return {};
      }

      try {
        const { data } = await refreshToken(token.refreshToken as string);

        return { ...token, ...user, ...data };
      } catch (e) {
        return {};
      }
    },
    // @ts-expect-error - This is a valid callback
    session: ({ session, token }) => {
      const isValid = isValidToken(token.accessToken);
      if (!isValid) return { expires: new Date(Date.now() - 3600).toISOString() };

      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expires = token.exp.toString();
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
