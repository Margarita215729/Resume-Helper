import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/builder') || 
                           nextUrl.pathname.startsWith('/profile') || 
                           nextUrl.pathname.startsWith('/matcher');
      const isOnAuth = nextUrl.pathname.startsWith('/auth');
      const isOnAPI = nextUrl.pathname.startsWith('/api');

      // Protect API routes except auth endpoints
      if (isOnAPI && !nextUrl.pathname.startsWith('/api/auth')) {
        if (!isLoggedIn) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return true;
      }

      // Redirect logged-in users away from auth pages
      if (isOnAuth) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/builder', nextUrl));
        }
        return true;
      }

      // Protect dashboard routes
      if (isOnDashboard) {
        if (!isLoggedIn) {
          const redirectUrl = new URL('/auth/signin', nextUrl);
          redirectUrl.searchParams.set('callbackUrl', nextUrl.pathname);
          return Response.redirect(redirectUrl);
        }
        return true;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  providers: [], // Add providers in auth.ts
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
