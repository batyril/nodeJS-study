import { IUser, User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../utils/getJwtSecret.js';

export const findUser = async ({
  email,
}: Partial<IUser>): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const createUser = async ({
  email,
  password,
  roles = ['user'],
}: IUser): Promise<IUser | null> => {
  const isDuplicates = await findUser({ email });
  if (isDuplicates) {
    throw new Error('Email already exists');
  }

  const token = jwt.sign({ email, password }, getJwtSecret());

  return User.create({ email, roles, token });
};

export const getUserData = async ({
  email,
  password,
}: IUser): Promise<IUser | null> => {
  const isUser = await findUser({ email });
  if (!isUser) {
    throw new Error('Email already exists');
  }

  const decoded = jwt.verify(isUser.token, getJwtSecret()) as IUser;

  if (decoded?.password !== password) {
    throw new Error('incorrect email or password');
  }

  return isUser;
};
