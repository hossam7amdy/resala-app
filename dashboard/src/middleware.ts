import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import ROUTES from './lib/routes';
import { getSession } from './lib/session';

const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.CATEGORIES,
  ROUTES.PRODUCTS,
  ROUTES.STOCKS,
  ROUTES.ORDERS,
  ROUTES.CUSTOMERS,
];

const checkIfProtectedRoute = (path: string) => {
  return PROTECTED_ROUTES.some(route => path.startsWith(route));
};

const authMiddleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = checkIfProtectedRoute(path);

  const session = getSession();

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.nextUrl));
  }
  if (session && !isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
};

export default authMiddleware;
