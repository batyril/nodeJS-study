import { createCategory } from '../../services/category.js';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { ICategories } from '../../models/Category.js';

export const addCategory = async (request: Request, response: Response) => {
  try {
    const data = matchedData<ICategories>(request);

    const category = await createCategory(data);
    return response.status(201).send(`categories created ${category}`);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
