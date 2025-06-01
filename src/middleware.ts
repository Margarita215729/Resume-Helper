import { auth } from '../auth';

export default auth((req) => {
  // This middleware uses NextAuth v5's built-in auth handling
  // The authorization logic is handled in auth.config.ts
  console.log(`[MIDDLEWARE] Processing path: ${req.nextUrl.pathname}`);
  console.log(`[MIDDLEWARE] Auth status - user: ${req.auth?.user ? 'authenticated' : 'unauthenticated'}`);
});

export const config = {
  matcher: [
    '/builder/:path*',
    '/profile/:path*', 
    '/matcher/:path*',
    '/auth/:path*'
  ]
};
