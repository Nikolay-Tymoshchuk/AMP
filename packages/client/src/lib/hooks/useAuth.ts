'use client';

import { useMutation, useQueryClient } from 'react-query';

import { login, logout, signup } from '@/lib/features/authApi';

import { KEYS } from '@/interfaces/enums';
import { signIn, signOut } from 'next-auth/react';
import { ROUTES } from '@/interfaces/enums';

const { AUTH } = KEYS;

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(login, {
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
  });
};

const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation(signup, {
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
  });
};

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: ({ success }) => {
      queryClient.invalidateQueries(AUTH);

      if (!success) return;

      signOut({
        callbackUrl: ROUTES.LOGIN,
        redirect: true,
      });
    },
  });
};

// LABEL: unnecessary for now
// const useCurrentUser = () => {
//   return useQuery(AUTH, currentUser);
// };

export { useLogin, useSignup, useLogout };
