import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { IUser } from '../../models/User.js';
import { createUser } from '../../services/user.js';

export const addUser = async (request: Request, response: Response) => {
  try {
    const data = matchedData<IUser>(request);

    const result = await createUser(data);

    if (result) {
      response.status(201).send(`пользователь создан `);
    } else {
      response.send(`Не удалось создать пользователя`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
