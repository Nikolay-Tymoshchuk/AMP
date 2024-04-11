import { IUser, IUserSession } from '@/interfaces/auth.interfaces';
import { USER_ROLE } from '@/interfaces/enums';
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
      const user: IUserSession = session.user;

      if (typeof token.token === 'string') {
        user.token = token.token;
      }

      if (typeof token.name === 'string') {
        user.name = token.name;
      }

      if (
        typeof token.role === 'string' &&
        Object.values(USER_ROLE).includes(token.role as USER_ROLE)
      ) {
        user.role = token.role as USER_ROLE;
      }

      return session;
    },
  },
};
