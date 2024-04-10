export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  GUEST = 'GUEST',
  REDACTOR = 'REDACTOR',
}

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  token: string;
}

export interface AuthUser {
  token: string;
  name: string;
  role: UserRole;
}

export interface RespUser {
  cookie: string;
  user: AuthUser;
}
