'use client';
import { useEffect } from 'react';
import baseApi from '@/lib/baseApi';

import { IParent } from '@/interfaces/components.interfaces';
import { useAuthHook } from '@/hooks';

export const AuthProvider = ({ children }: IParent) => {
  console.log('AuthProvider');
  const { token } = useAuthHook();

  useEffect(() => {
    if (token) {
      baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  return <>{children}</>;
};
