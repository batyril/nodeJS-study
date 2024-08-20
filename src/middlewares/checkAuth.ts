import { NextFunction, Response } from 'express';
import { getDecodedToken } from '../utils/getDecodedToken.js';
import { CustomRequest } from '../types/index.js';

const checkAuth = () => {
  return async (
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return response.status(401).send('Требуется авторизация');
      }

      request.user = getDecodedToken(authHeader);
      next();
    } catch (e) {
      return response.status(401).send('Пользователь не авторизован');
    }
  };
};

export default checkAuth;
