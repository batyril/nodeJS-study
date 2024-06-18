import checkId from '../../validation/checkId.js';
import { findCategory } from '../../services/category.js';
import { Request, Response } from 'express';

export const getCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const movies = await findCategory(id);
    response.send(movies);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
