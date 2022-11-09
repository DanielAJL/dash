import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO } from '@/DTOs/user.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import UserService from '@/services/users.service';

class AuthController {
  public authService = new AuthService();
  public userService = new UserService();

  // public signUp = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userData: CreateUserDTO = req.body;
  //     const signUpUserData: User = await this.authService.signup(userData);

  //     res.status(201).json({ data: signUpUserData, message: 'signup' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDTO = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
      findUser.online = true;
      this.userService.updateUser(findUser._id, findUser);
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
      logOutUserData.online = false;
      this.userService.updateUser(logOutUserData._id, logOutUserData);
    } catch (error) {
      next(error);
    }
  };

  public getCurrentSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.body);
      res.status(200).json({ data: req.body, message: 'current_user_session' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
