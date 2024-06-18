import { createCategory } from '../../services/category.js';
import { Request, Response } from 'express';

export const addCategory = async (request: Request, response: Response) => {
  try {
    const category = await createCategory(request.body);
    return response.status(201).send(`categories created ${category}`);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
