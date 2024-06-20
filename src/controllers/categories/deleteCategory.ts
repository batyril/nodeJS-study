import { Request, Response } from 'express';
import { findByIdAndDelete } from '../../services/category.js';

export const deleteCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const category = await findByIdAndDelete(id);
    if (category) {
      response.send(`Категория удалена ${category}`);
    } else {
      response.send(`Не удалось найти категорию с ${id}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
