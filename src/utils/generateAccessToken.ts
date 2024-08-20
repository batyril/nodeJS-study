import { getJwtSecret } from './getJwtSecret.js';
import jwt from 'jsonwebtoken';
import { TRoleVariants } from '../models/Role.js';

export function generateAccessToken(id: string, roles: TRoleVariants) {
  const payload = { id, roles };
  return jwt.sign(payload, getJwtSecret());
}
