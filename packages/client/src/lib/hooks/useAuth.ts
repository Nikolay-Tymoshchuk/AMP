'use client';

import { useMutation, useQueryClient } from 'react-query';

import { login, logout, signup } from '@/lib/features/authApi';
import { useAxiosAuth } from './useAxiosAuth';

import { KEYS } from '@/interfaces/enums';
import { signIn, signOut } from 'next-auth/react';
import { ROUTES } from '@/interfaces/enums';
import {
  AuthResponse,
  IUserCreate,
  IUserLogin,
} from '@/interfaces/auth.interfaces';
import { CommonResponse } from '@/interfaces/common.interfaces';

const { API_AUTH, API_LOGIN, API_SIGNUP, API_LOGOUT } = ROUTES;

const { AUTH } = KEYS;

const useLogin = () => {
  const queryClient = useQueryClient();
  const baseApi = useAxiosAuth();

  const login = async (body: IUserLogin): Promise<AuthResponse> => {
    const response = await baseApi.post(API_LOGIN, body);
    return response.data;
  };

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
  const baseApi = useAxiosAuth();

  const signup = async (body: IUserCreate): Promise<AuthResponse> => {
    const response = await baseApi.post(API_SIGNUP, body);
    return response.data;
  };

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
  const baseApi = useAxiosAuth();

  const logout = async (): Promise<CommonResponse> => {
    const response = await baseApi.post(API_LOGOUT);
    return response.data;
  };

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

export { useLogin, useSignup, useLogout };
