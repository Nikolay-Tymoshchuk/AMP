'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/layout/AuthProvider';

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
