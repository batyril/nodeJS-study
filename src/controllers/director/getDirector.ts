import { Request, Response } from 'express';
import { findDirector } from '../../services/director.js';

export const getDirector = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const movies = await findDirector(id);
    response.send(movies);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
