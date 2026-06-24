import {auth} from './auth';
import {NextResponse} from 'next/server';
import {type NextRequest} from 'next/server';

export default auth((req: NextRequest) => {
  // req.auth로 세션 정보 접근 가능
  const headers = new Headers(req.headers);
  headers.set('x-pathname', req.nextUrl.pathname);

  return NextResponse.next({
    request: {headers}
  });
});

export const config = {
  matcher: '/auth/:path*'
};
