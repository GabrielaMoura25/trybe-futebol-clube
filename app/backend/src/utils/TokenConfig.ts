import * as jwt from 'jsonwebtoken';

const jwtSingOptions: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };
const SECRET = process.env.JWT_SECRET as string;

const TokenConfig = {
  createToken: (email: string) => {
    const token = jwt.sign({ email }, SECRET, jwtSingOptions);

    return token;
  },
  verifyToken: (token: string) => {
    const verified = jwt.verify(token, SECRET) as jwt.JwtPayload;

    return verified;
  },
};

export default TokenConfig;
