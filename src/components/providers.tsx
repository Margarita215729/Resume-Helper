'use client';

import { SessionProvider } from 'next-auth/react';
import { ClientAuthProvider } from '@/services/client-auth.service';
import ErrorBoundary from './error-boundary';

// Check if we're in a static environment
const isStaticEnvironment = typeof window !== 'undefined' && 
  (window.location.hostname === 'username.github.io' || 
   window.location.hostname.includes('github.io') ||
   process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET);

export function Providers({ 
  children, 
  session 
}: { 
  children: React.ReactNode; 
  session?: any;
}) {
  return (
    <ErrorBoundary>
      {isStaticEnvironment ? (
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
