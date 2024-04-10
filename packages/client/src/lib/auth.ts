import { UserRole } from '@/interfaces/auth.interfaces';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        token: { label: 'token' },
        name: { label: 'name' },
        version: { label: 'version' },
      },
      authorize(credentials) {
        if (credentials && credentials.token) {
          return credentials as any;
        }
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.token = token.token as string;
      session.user.name = token.name as string;
      session.user.role = token.role as UserRole;

      return session;
    },
  },
};
