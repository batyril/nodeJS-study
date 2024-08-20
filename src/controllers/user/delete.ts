import { Request, Response } from 'express';
import { findByEmailAndDeleteUser } from '../../services/user.js';

export const deleted = async (request: Request, response: Response) => {
  try {
    const { email } = request.body;

    const user = await findByEmailAndDeleteUser(email);
    if (user) {
      response.send(`user удален ${user}`);
    } else {
      response.send(`Не удалось найти пользователя`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
