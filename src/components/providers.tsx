'use client';

import { ClientAuthProvider } from '@/services/client-auth.service';
import ErrorBoundary from './error-boundary';

export function Providers({ 
  children, 
  session 
}: { 
  children: React.ReactNode; 
  session?: any;
}) {
  return (
    <ErrorBoundary>
      <ClientAuthProvider>
        {children}
      </ClientAuthProvider>
    </ErrorBoundary>
  );
}
