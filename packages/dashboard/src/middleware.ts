import { authenticatedUser } from '@/utils/amplify-server-utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { PROTECTED_ROUTES, ROUTES } from './routes';

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isLoggedIn = Boolean(user);
  const isAdmin = Boolean(user?.isAdmin);
  const pathname = request.nextUrl.pathname;
  const isOnDashboard = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (pathname === ROUTES.NOT_AUTHORIZED) {
    return response;
  }

  if (isOnDashboard) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    } else if (!isAdmin) {
      return NextResponse.redirect(new URL(ROUTES.NOT_AUTHORIZED, request.url));
    }
    return response;
  } else if (isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return response;
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
};
