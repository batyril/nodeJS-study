import { Response } from 'express';
import { User } from '../../models/User.js';
import { CustomRequest } from '../../types/index.js';

export const getAll = async (request: CustomRequest, response: Response) => {
  try {
    const users = await User.find();

    response.send(users);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
