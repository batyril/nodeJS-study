import jwt from 'jsonwebtoken';
import { getJwtSecret } from './getJwtSecret.js';
import { TRoleVariants } from '../models/Role.js';

export const getDecodedToken = (authHeader: string) => {
  try {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, getJwtSecret()) as {
      id: string;
      roles: TRoleVariants;
    };
  } catch (error) {
    throw new Error('decode token failed');
  }
};
