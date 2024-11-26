import { type NextRequest, NextResponse } from 'next/server';

const middleware = (request: NextRequest) => {
  return NextResponse.next({ request });
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
};

export default middleware;
