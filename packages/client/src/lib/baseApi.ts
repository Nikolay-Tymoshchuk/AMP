import axios from 'axios';
import { signOut } from 'next-auth/react';

import { NEXTAPI_URL } from '@/config';
import { ROUTES } from '@/interfaces/enums';

const baseApi = axios.create({
  baseURL: NEXTAPI_URL,
});

baseApi.interceptors.response.use(
  response => response,

  // If the response is an error, and the status code is 401, sign out the user
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

export default baseApi;
