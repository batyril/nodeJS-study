import { Request, Response } from 'express';
import { findByIdAndDeleteDirector } from '../../services/director.js';

export const deleteDirector = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const category = await findByIdAndDeleteDirector(id);
    if (category) {
      response.send(`Директор удален ${category}`);
    } else {
      response.send(`Не удалось найти директора с ${id}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
