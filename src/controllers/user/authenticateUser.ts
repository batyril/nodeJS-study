import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { IUser } from '../../models/User.js';
import { getUserData } from '../../services/user.js';

export const authenticateUser = async (
  request: Request,
  response: Response
) => {
  try {
    const data = matchedData<IUser>(request);

    const result = await getUserData(data);

    if (result) {
      response.cookie('sameSite', result.token);
      response.status(201).send(`authentication has passed`);
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
