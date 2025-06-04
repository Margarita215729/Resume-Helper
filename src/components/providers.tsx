'use client';

import { SessionProvider } from 'next-auth/react';
import { ClientAuthProvider } from '@/services/client-auth.service';
import ErrorBoundary from './error-boundary';

// Check if we're in a static environment
const isStaticEnvironment = () => {
  // During build time, default to client auth if NEXTAUTH_SECRET is not set
  if (typeof window === 'undefined') {
    return !process.env.NEXTAUTH_SECRET;
  }
  
  // During runtime, check hostname and environment
  return (
    window.location.hostname.includes('github.io') ||
    window.location.hostname === 'localhost' && !process.env.NEXTAUTH_SECRET ||
    process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET
  );
};

export function Providers({ 
  children, 
  session 
}: { 
  children: React.ReactNode; 
  session?: any;
}) {
  return (
    <ErrorBoundary>
      {isStaticEnvironment() ? (
        <ClientAuthProvider>
          {children}
        </ClientAuthProvider>
      ) : (
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      )}
    </ErrorBoundary>
  );
}
