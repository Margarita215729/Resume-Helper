import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../auth';

export async function middleware(request: NextRequest) {
  console.log(`[MIDDLEWARE] Processing path: ${request.nextUrl.pathname}`);
  
  try {
    // Get the auth session
    const session = await auth();
    const isLoggedIn = !!session?.user;
    
    console.log(`[MIDDLEWARE] Auth status - isLoggedIn: ${isLoggedIn}`);
    
    const isOnDashboard = request.nextUrl.pathname.startsWith('/builder') || 
                         request.nextUrl.pathname.startsWith('/profile') || 
                         request.nextUrl.pathname.startsWith('/matcher');
    const isOnAuth = request.nextUrl.pathname.startsWith('/auth');

    console.log(`[MIDDLEWARE] Route analysis - isOnDashboard: ${isOnDashboard}, isOnAuth: ${isOnAuth}`);

    // Redirect logged-in users away from auth pages
    if (isOnAuth && isLoggedIn) {
      console.log('[MIDDLEWARE] Redirecting authenticated user away from auth pages');
      return NextResponse.redirect(new URL('/builder', request.url));
    }

    // Protect dashboard routes
    if (isOnDashboard && !isLoggedIn) {
      console.log('[MIDDLEWARE] Redirecting unauthenticated user to sign-in');
      const redirectUrl = new URL('/auth/signin', request.url);
      redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    console.log('[MIDDLEWARE] Allowing request to proceed');
    return NextResponse.next();
  } catch (error) {
    console.error('[MIDDLEWARE ERROR]', error);
    // On error, redirect to sign-in for protected routes
    const isOnDashboard = request.nextUrl.pathname.startsWith('/builder') || 
                         request.nextUrl.pathname.startsWith('/profile') || 
                         request.nextUrl.pathname.startsWith('/matcher');
    
    if (isOnDashboard) {
      console.log('[MIDDLEWARE] Error occurred, redirecting to sign-in');
      const redirectUrl = new URL('/auth/signin', request.url);
      redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/builder/:path*',
    '/profile/:path*',
    '/matcher/:path*',
    '/auth/:path*'
  ],
};
