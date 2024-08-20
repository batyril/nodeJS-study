import { IUser, User } from '../models/User.js';
import bcrypt from 'bcrypt';
import { Role } from '../models/Role.js';
import { generateAccessToken } from '../utils/generateAccessToken.js';

export const findAndUpdate = async (
  id: string,
  fieldsToUpdate: Partial<IUser>
): Promise<IUser | null> => {
  return User.findOneAndUpdate({ _id: id }, fieldsToUpdate, { new: true });
};

export const findByEmailAndDeleteUser = async (
  email: string
): Promise<IUser | null> => {
  return User.findOneAndDelete(
    { email },
    {
      new: true,
    }
  );
};

export const findUser = async ({
  email,
}: Partial<IUser>): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const createUser = async ({
  email,
  password,
}: IUser): Promise<IUser | null> => {
  const isDuplicates = await findUser({ email });
  if (isDuplicates) {
    throw new Error('Email already exists');
  }

  if (!password) {
    throw new Error('password null');
  }

  const hashPassword = bcrypt.hashSync(password, 7);

  const userRole = await Role.findOne({ name: 'USER' });

  // const token = jwt.sign({ email, password }, getJwtSecret());

  return User.create({
    email,
    password: hashPassword,
    roles: [userRole?.name],
  });
};

export const getUserToken = async ({
  email,
  password,
}: IUser): Promise<string | null> => {
  const user = await findUser({ email });
  if (!user) {
    throw new Error('Email already exists');
  }

  if (!password || !user?.password) {
    throw new Error('password null');
  }

  // const decoded = jwt.verify(isUser.token, getJwtSecret()) as IUser;
  //
  // if (decoded?.password !== password) {
  //   throw new Error('incorrect email or password');
  // }

  const validPassword = bcrypt.compareSync(password, user?.password);

  if (!validPassword) {
    throw new Error('incorrect email or password');
  }

  return generateAccessToken(user._id, user.roles);
};
//
// {
//   "email": "gdg@email.com",
//   "password": "Add your name in the body"
// }
