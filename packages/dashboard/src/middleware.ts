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

const authMiddleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.some(route => path.startsWith(route));

  const session = getCookie(Token.Access);

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
