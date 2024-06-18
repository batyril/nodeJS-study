import { Request, Response } from 'express';
import checkId from '../../validation/checkId.js';
import { createComment } from '../../services/comment.js';

export const addComment = async (request: Request, response: Response) => {
  try {
    const { name, comment } = request.body;
    if (!name || !comment) {
      return response.status(400).send('name и comment обязателен');
    }

    const id = request.params.movieId;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const result = await createComment(request.body, id);
    if (result) {
      return response.status(201).send(`комментарий добавлен ${result}`);
    } else {
      return response.send(`комментарий не добавлен`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
