import { Request, Response } from 'express';
import { updateCategoryById } from '../../services/category.js';

export const updateCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await updateCategoryById(id, request.body);

    if (result) {
      response.send(`Фильм изменен ${result}`);
    } else {
      response.send(`Не удалось найти фильм с id ${id}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
