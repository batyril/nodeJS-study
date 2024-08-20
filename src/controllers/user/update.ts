import { Response } from 'express';
import { CustomRequest } from '../../types/index.js';
import { findAndUpdate } from '../../services/user.js';

export const update = async (request: CustomRequest, response: Response) => {
  try {
    const user = request.user;
    if (!user) {
      response.send(`Не удалось получить user`);
    }
    const result = await findAndUpdate(String(user?.id), request.body);

    if (result) {
      response.send(result);
    } else {
      response.send(`Не удалось изменить user`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
