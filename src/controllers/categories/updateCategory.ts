import { Request, Response } from 'express';
import { updateCategoryById } from '../../services/category.js';
import { matchedData, validationResult } from 'express-validator';
import { ICategories } from '../../models/Category.js';

export const updateCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const data = matchedData<ICategories>(request);

    const result = await updateCategoryById(id, data);

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
