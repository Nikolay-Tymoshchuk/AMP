import NextAuth from 'next-auth';

import { UserRole } from '@/interfaces/auth.interfaces';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      token: string;
      role: UserRole;
    };
  }
}
