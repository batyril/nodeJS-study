import { IUser, User } from '../models/User.js';

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

  return User.create({ email, roles, password });
};

export const getUserData = async ({
  email,
  password,
}: IUser): Promise<IUser | null> => {
  const isUser = await findUser({ email });
  if (!isUser) {
    throw new Error('Email already exists');
  }

  if (isUser.password !== password) {
    throw new Error('incorrect email or password');
  }

  return isUser;
};
