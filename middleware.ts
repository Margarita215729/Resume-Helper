import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🚀 MIDDLEWARE IS RUNNING! Path:', request.nextUrl.pathname);
  
  // Simple test - redirect builder to signin
  if (request.nextUrl.pathname.startsWith('/builder')) {
    console.log('🔒 Redirecting /builder to /auth/signin');
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/builder/:path*', '/auth/:path*'],
};
