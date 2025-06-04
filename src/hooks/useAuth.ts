// Adaptive authentication hook that works in both static and server environments
'use client';

import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';
import { useClientAuth } from '@/services/client-auth.service';

// Check if we're in a static environment
const isStaticEnvironment = typeof window !== 'undefined' && 
  (window.location.hostname === 'username.github.io' || 
   window.location.hostname.includes('github.io') ||
   process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET);

export function useAuth() {
  const nextAuthSession = useSession();
  const clientAuth = useClientAuth();

  if (isStaticEnvironment) {
    return {
      user: clientAuth.user,
      isLoading: clientAuth.isLoading,
      signIn: async (email: string, password: string) => {
        return await clientAuth.signIn(email, password);
      },
      signUp: async (name: string, email: string, password: string) => {
        return await clientAuth.signUp(name, email, password);
      },
      signOut: () => {
        clientAuth.signOut();
        // Redirect to home page
        window.location.href = '/';
      },
      isAuthenticated: !!clientAuth.user
    };
  } else {
    return {
      user: nextAuthSession.data?.user || null,
      isLoading: nextAuthSession.status === 'loading',
      signIn: async (email: string, password: string) => {
        const result = await nextAuthSignIn('credentials', {
          email,
          password,
          redirect: false,
        });
        return result?.ok || false;
      },
      signUp: async (name: string, email: string, password: string) => {
        try {
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });
          return response.ok;
        } catch {
          return false;
        }
      },
      signOut: () => {
        nextAuthSignOut({ callbackUrl: '/' });
      },
      isAuthenticated: nextAuthSession.status === 'authenticated'
    };
  }
}

// Higher-order component for protected routes that works in both environments
export function withAuth<T extends {}>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!user) {
      // Redirect to sign in
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin';
      }
      return null;
    }

    return <Component {...props} />;
  };
}
