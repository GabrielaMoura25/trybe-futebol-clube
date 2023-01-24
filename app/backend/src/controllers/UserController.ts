import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _service = new UserService()) {}

  login = async (req: Request, res: Response) => {
    const user = req.body as ILogin;

    const { code, message, token } = await this._service.login(user);

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ token });
  };

  validateLogin = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    const { code, message, role } = await this._service.validateLogin(authorization);

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ role });
  };
}
