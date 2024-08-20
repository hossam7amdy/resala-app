import type { NextAuthConfig } from 'next-auth';

import { PROTECTED_ROUTES, ROUTES } from './utils/routes';

export const parseJwt = (token: string) => {
  try {
    // atob: decodes base64 strings
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const getIsTokenValid = (token: string) => {
  if (!token) return false;

  const jwtExpireTimestamp = parseJwt(token).exp;

  console.log('parseJwt', parseJwt(token));

  const jwtExpireDateTime = new Date(jwtExpireTimestamp * 1000);

  if (jwtExpireDateTime < new Date()) {
    console.log('API token expired');
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

      const isOnDashboard = PROTECTED_ROUTES.some(route => nextUrl.pathname.startsWith(route));

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(ROUTES.DASHBOARD, nextUrl));
      }
      return true;
    },
    jwt: ({ token, user }) => {
      return { ...token, ...user };
    },
    // @ts-expect-error - This is a valid callback
    session: ({ session, token }) => {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      session.expires = new Date(token.expiresAt).toISOString();
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
