import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { IUser } from '../../models/User.js';
import { createUser } from '../../services/user.js';

export const registration = async (request: Request, response: Response) => {
  try {
    const data = matchedData<IUser>(request);

    const result = await createUser(data);

    if (result) {
      response.status(201).send(`пользователь создан `);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
