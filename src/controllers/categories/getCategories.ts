import { findCategories } from '../../services/category.js';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const getCategories = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { sort, sortOrder } = request.query;

    const isSortOrder = sortOrder === 'desc' ? 'desc' : 'asc';

    const categories = await findCategories(
      request.query,
      String(sort),
      isSortOrder
    );

    response.send(categories);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
