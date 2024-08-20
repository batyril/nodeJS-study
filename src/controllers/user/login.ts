import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { IUser } from '../../models/User.js';
import { getUserToken } from '../../services/user.js';

export const login = async (request: Request, response: Response) => {
  try {
    const data = matchedData<IUser>(request);

    const token = await getUserToken(data);

    response.cookie('sameSite', token);
    response.status(201).send(`authentication has passed`);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
