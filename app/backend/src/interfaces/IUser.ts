import ILogin from './ILogin';

export interface IUser extends ILogin {
  id?: number,
  username: string,
  role: string,
}
