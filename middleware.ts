import { auth } from './auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log('🚀 MIDDLEWARE IS RUNNING! Path:', nextUrl.pathname, 'Authenticated:', isLoggedIn);

  const isOnDashboard = nextUrl.pathname.startsWith('/builder') || 
                       nextUrl.pathname.startsWith('/profile') || 
                       nextUrl.pathname.startsWith('/matcher');
  const isOnAuth = nextUrl.pathname.startsWith('/auth');

  // Redirect logged-in users away from auth pages
  if (isOnAuth && isLoggedIn) {
    console.log('🔄 Redirecting authenticated user from auth page to /builder');
    return Response.redirect(new URL('/builder', nextUrl));
  }

  // Protect dashboard routes
  if (isOnDashboard && !isLoggedIn) {
    console.log('🔒 Redirecting unauthenticated user to /auth/signin');
    const redirectUrl = new URL('/auth/signin', nextUrl);
    redirectUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return Response.redirect(redirectUrl);
  }

  return;
});

export const config = {
  matcher: ['/builder/:path*', '/profile/:path*', '/matcher/:path*', '/auth/:path*'],
};
