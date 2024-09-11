import { PROTECTED_ROUTES, ROUTES } from '@/utils/routes';
import type { RefreshTokenRequest, RefreshTokenResponse } from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { jwtDecode } from 'jwt-decode';
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

import type { AuthUser } from '../next-auth';

export const refreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const { method, url } = ENDPOINT_CONFIGS.refresh;

  const response = await fetch(`${process.env.API_HOST}${url}`, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken } as RefreshTokenRequest['body']),
  });

  return response.json();
};

export const authConfig = {
  pages: {
    signIn: ROUTES.LOGIN,
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized: ({ auth, request: { url, nextUrl, headers } }) => {
      // Store current request url in a custom header, which you can read later
      // https://stackoverflow.com/questions/75362636/how-can-i-get-the-url-pathname-on-a-server-component-next-js-13
      const requestHeaders = new Headers(headers);
      const pathname = new URL(url).pathname;
      requestHeaders.set('x-pathname', pathname);

      const isLoggedIn = !!auth?.user;

      const isOnDashboard = PROTECTED_ROUTES.some(route => nextUrl.pathname.startsWith(route));

      if (isOnDashboard) {
        if (isLoggedIn)
          return NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(ROUTES.DASHBOARD, nextUrl));
      }
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const { accessToken, refreshToken, ...userProps } = user;

        token.user = userProps as AuthUser;

        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.expiresAt = jwtDecode(accessToken).exp ?? 0;
      } else if (Date.now() / 1000 >= (jwtDecode(token.accessToken)?.exp ?? 0)) {
        try {
          if (!token.refreshToken) throw new Error('Missing refresh token');

          const { data } = await refreshToken(token.refreshToken);

          token.accessToken = data.accessToken;
          token.refreshToken = data.refreshToken;
          token.expiresAt = jwtDecode(data.accessToken).exp ?? 0;
        } catch (e) {
          token.error = 'RefreshTokenError';
        }
      }
      return token;
    },
    // @ts-expect-error `token` is defined in `jwt` callback
    session: ({ session, token }) => {
      if (token.error === 'RefreshTokenError') {
        return { user: null };
      }
      return { ...session, ...token };
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
