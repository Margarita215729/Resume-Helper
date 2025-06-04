'use client';

import { SessionProvider } from 'next-auth/react';
import { ClientAuthProvider } from '@/services/client-auth.service';
import ErrorBoundary from './error-boundary';

export function Providers({ 
  children, 
  session 
}: { 
  children: React.ReactNode; 
  session?: any;
}) {
  // For static builds, always use ClientAuthProvider
  // This will be determined at runtime anyway
  const useClientAuth = true; // Force client auth for static builds

  return (
    <ErrorBoundary>
      {useClientAuth ? (
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
