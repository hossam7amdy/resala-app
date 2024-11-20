import { authenticatedUser } from '@/utils/amplify-server-utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { handleApiRequest } from './api-middleware';
import { PROTECTED_ROUTES, ROUTES } from './routes';

const handleNextRequest = async (request: NextRequest) => {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const pathname = request.nextUrl.pathname;
  const isOnDashboard = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isOnDashboard) {
    if (!user) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
    return response;
  } else if (user) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
};

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/api')) {
    return handleApiRequest(request);
  }

  return handleNextRequest(request);
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
};
