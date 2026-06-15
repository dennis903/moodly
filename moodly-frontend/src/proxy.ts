import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);

  console.log(request.nextUrl.pathname);

  headers.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers
    }
  });
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: '/auth/:path*'
};
