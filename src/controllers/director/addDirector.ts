import { createDirector } from '../../services/director.js';
import { Request, Response } from 'express';

export const addDirector = async (request: Request, response: Response) => {
  try {
    const director = await createDirector(request.body);
    return response.status(201).send(`director created ${director}`);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
