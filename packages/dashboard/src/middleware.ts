import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getCookie } from './utils/cookies';
import { Token } from './utils/enums';
import ROUTES from './utils/routes';

const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.CATEGORIES,
  ROUTES.PRODUCTS,
  ROUTES.STOCKS,
  ROUTES.COLORS,
  ROUTES.SIZES,
  ROUTES.ORDERS,
  ROUTES.CUSTOMERS,
];

const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.some(route => path.startsWith(route));

  const session = getCookie(Token.Access);

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.nextUrl));
  }
  if (session && !isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.nextUrl));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    headers: requestHeaders,
  });
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
};

export default middleware;
