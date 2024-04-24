import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import ROUTES from './lib/routes';
import { getSession } from './lib/session';

const authMiddleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith(ROUTES.DASHBOARD);

  const session = getSession();

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
};

export default authMiddleware;
