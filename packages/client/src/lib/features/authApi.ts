import baseApi from '../baseApi';

import {
  AuthResponse,
  CurrentUserResponse,
  IUserCreate,
  IUserLogin,
} from '@/interfaces/auth.interfaces';
import { CommonResponse } from '@/interfaces/common.interfaces';
import { ROUTES } from '@/interfaces/enums';

const { API_AUTH, API_LOGIN, API_SIGNUP, API_LOGOUT } = ROUTES;

export const currentUser = async (): Promise<CurrentUserResponse> => {
  const response = await baseApi.get(API_AUTH);
  return response.data;
};

export const signup = async (body: IUserCreate): Promise<AuthResponse> => {
  const response = await baseApi.post(API_SIGNUP, body);
  return response.data;
};

export const login = async (body: IUserLogin): Promise<AuthResponse> => {
  const response = await baseApi.post(API_LOGIN, body);
  return response.data;
};

export const logout = async (): Promise<CommonResponse> => {
  const response = await baseApi.post(API_LOGOUT);
  return response.data;
};
