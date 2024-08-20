import { NextFunction, Request, Response } from 'express';
import { getDecodedToken } from '../utils/getDecodedToken.js';
import { TRoleVariants } from '../models/Role.js';

const checkRoles = (roles: TRoleVariants) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return response.status(401).send('Требуется авторизация');
      }

      const { roles: userRoles } = getDecodedToken(authHeader);
      let hasRules = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRules = true;
        }
      });
      if (!hasRules) {
        return response.status(401).send('Нет доступов');
      }
      next();
    } catch (e) {
      return response.status(401).send('Пользователь не авторизован');
    }
  };
};

export default checkRoles;
