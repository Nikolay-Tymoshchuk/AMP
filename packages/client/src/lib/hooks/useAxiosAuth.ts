'use client';
import baseApi from '@/lib/baseApi';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

import { ROUTES } from '@/interfaces/enums';

export const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercept = baseApi.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${session?.user?.token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = baseApi.interceptors.response.use(
      response => response,
      error => {
        if (
          error &&
          error?.response?.status == 401 &&
          !error?.config?.url?.includes(ROUTES.API_LOGIN)
        ) {
          signOut({ redirect: true });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      baseApi.interceptors.request.eject(requestIntercept);
      baseApi.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return baseApi;
};
