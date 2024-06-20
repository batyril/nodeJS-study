import { findCategory } from '../../services/category.js';
import { Request, Response } from 'express';

export const getCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await findCategory(id);
    if (result) {
      response.status(200).send(result);
    } else {
      response.send(`Не удалось найти категорию с id ${id}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
