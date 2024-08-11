import { NextFunction, Request, Response } from 'express';
import { findUser } from '../services/user.js';
import decodeCredentials from '../utils/decodeCredentials.js';

const checkAuth = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      response.set('WWW-Authenticate', 'Basic realm="Access to the site"');
      return response.status(401).send('Требуется авторизация.');
    }

    const { email, password } = decodeCredentials(authHeader);

    const user = await findUser({ email });

    if (user && user.password === password) {
      return next();
    } else {
      response.set('WWW-Authenticate', 'Basic realm="Access to the site"');
      return response.status(401).send('Неверные учетные данные.');
    }
  };
};

export default checkAuth;
