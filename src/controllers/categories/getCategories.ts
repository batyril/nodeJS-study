import { findCategories } from '../../services/category.js';
import { Request, Response } from 'express';

export const getCategories = async (request: Request, response: Response) => {
  try {
    const categories = await findCategories();
    response.send(categories);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
