import User from '../database/models/User';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  protected model = User;

  async findOne(email: string): Promise<IUser | null> {
    return this.model.findOne({ where: { email } });
  }
}
