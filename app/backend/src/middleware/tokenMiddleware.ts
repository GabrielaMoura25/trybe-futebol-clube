import { RequestHandler } from 'express';
import TokenConfig from '../utils/TokenConfig';

const tokenMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(404).json({ message: 'Token not found' });
  }
  try {
    const token = TokenConfig.verifyToken(authorization);
    req.body.user = token;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenMiddleware;
