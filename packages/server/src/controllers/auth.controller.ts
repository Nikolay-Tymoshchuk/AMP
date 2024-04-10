import { NextFunction, Request, Response } from 'express';

import AuthService from '@services/auth.service';

import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, user } = await this.authService.signup(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({
        data: user,
        message: 'signup',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { cookie, user } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({
        data: user,
        message: 'login',
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logout', success: true });
    } catch (error) {
      next(error);
    }
  };

  public authenticate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      res.status(200).json({ data: userData, message: 'authenticate', success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
