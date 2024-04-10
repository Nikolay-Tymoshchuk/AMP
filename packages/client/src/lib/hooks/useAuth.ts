'use client';

import { useQuery, useMutation, useQueryClient } from 'react-query';

import { currentUser, login, logout, signup } from '@/lib/features/authApi';

import { KEYS } from '@/interfaces/enums';
import { signIn, signOut } from 'next-auth/react';
import { ROUTES } from '@/interfaces/enums';

const { AUTH } = KEYS;

export const useAuth = () => {
  const queryClient = useQueryClient();

  return {
    useLogin: () =>
      useMutation(login, {
        onSuccess: ({ data: { token, name, role }, success }) => {
          queryClient.invalidateQueries(AUTH);

          if (!success) return;

          signIn('credentials', {
            token,
            name,
            role,
            callbackUrl: ROUTES.EDITOR,
          });
        },
      }),

    useSignup: () =>
      useMutation(signup, {
        onSuccess: ({ data: { token, name, role }, success }) => {
          queryClient.invalidateQueries(AUTH);
          if (!success) return;

          signIn('credentials', {
            token,
            name,
            role,
            callbackUrl: ROUTES.EDITOR,
          });
        },
      }),

    useLogout: () =>
      useMutation(logout, {
        onSuccess: ({ success }) => {
          queryClient.invalidateQueries(AUTH);

          if (!success) return;

          signOut({
            callbackUrl: ROUTES.LOGIN,
            redirect: true,
          });
        },
      }),

    useCurrentUser: () => useQuery(AUTH, currentUser),
  };
};
