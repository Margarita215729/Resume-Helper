import { auth } from '../auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;

  console.log(`[MIDDLEWARE] Processing path: ${nextUrl.pathname}`);
  console.log(`[MIDDLEWARE] Auth status - user: ${isLoggedIn ? 'authenticated' : 'unauthenticated'}`);

  const isOnDashboard = nextUrl.pathname.startsWith('/builder') || 
                       nextUrl.pathname.startsWith('/profile') || 
                       nextUrl.pathname.startsWith('/matcher');
  const isOnAuth = nextUrl.pathname.startsWith('/auth');

  // Redirect logged-in users away from auth pages
  if (isOnAuth && isLoggedIn) {
    console.log('[MIDDLEWARE] 🔄 Redirecting authenticated user from auth page to /builder');
    return Response.redirect(new URL('/builder', nextUrl));
  }

  // Protect dashboard routes
  if (isOnDashboard && !isLoggedIn) {
    console.log('[MIDDLEWARE] 🔒 Redirecting unauthenticated user to /auth/signin');
    const redirectUrl = new URL('/auth/signin', nextUrl);
    redirectUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return Response.redirect(redirectUrl);
  }

  console.log('[MIDDLEWARE] ✅ Access allowed');
  return;
});

export const config = {
  matcher: [
    '/builder/:path*',
    '/profile/:path*', 
    '/matcher/:path*',
    '/auth/:path*'
  ]
};
