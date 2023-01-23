import UserModel from '../model/UserModel';
import TokenConfig from '../utils/TokenConfig';
import ILogin from '../interfaces/ILogin';
import Bcrypt from '../utils/Bcrypt';

export default class UserService {
  constructor(private _model = new UserModel()) {}

  login = async (user: ILogin) => {
    const findUser = await this._model.findOne(user.email);

    if (!findUser) return { code: 401, message: 'Incorrect email or password' };
    console.log('finduser', findUser.password);

    const passEncript = Bcrypt.compare(user.password, findUser.password);

    if (!passEncript) return { code: 401, message: 'Incorrect email or password' };

    const token = TokenConfig.createToken(user.email);

    return { code: 200, token };
  };

  validateLogin = async (token: string | undefined) => {
    if (!token) return { code: 401, message: 'Token not found' };

    try {
      const verifiedToken = TokenConfig.verifyToken(token);
      const verifiedUser = await this._model.findOne(verifiedToken.email);

      if (!verifiedUser) return { code: 401, message: 'User not found' };

      return { code: 200, role: verifiedUser.role };
    } catch (error) {
      return { code: 401, message: 'Expired or invalid token' };
    }
  };
}
