import { betterFetch } from '@better-fetch/fetch';
import type { User } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

import { PROTECTED_ROUTES, ROUTES } from './routes';

const middleware = async (request: NextRequest) => {
  const { data: session } = await betterFetch<{ user?: User }>('/api/auth/get-session', {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  const pathname = request.nextUrl.pathname;
  const isAdmin = session?.user?.role.toLowerCase() === 'admin';
  const isOnNotAuthorized = pathname === ROUTES.NOT_AUTHORIZED;
  const isOnDashboard = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isOnNotAuthorized) {
    return NextResponse.next();
  }

  if (isOnDashboard && !session) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (!isOnDashboard && session) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  if (isOnDashboard && session && !isAdmin) {
    return NextResponse.redirect(new URL(ROUTES.NOT_AUTHORIZED, request.url));
  }

  return NextResponse.next();
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
};

export default middleware;
