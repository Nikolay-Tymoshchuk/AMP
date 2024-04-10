import { CommonResponse } from './common.interfaces';
import { USER_ROLE } from './enums';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserCreate extends IUserLogin {
  name: string;
  role: USER_ROLE;
}

export interface IUser extends IUserCreate {
  token: string;
}

export interface ICurrentUser extends IUser {
  _id: string;
  email: string;
  password: string;
}

export interface AuthResponse extends CommonResponse {
  data: IUser;
}

export interface CurrentUserResponse extends CommonResponse {
  data: ICurrentUser;
}
