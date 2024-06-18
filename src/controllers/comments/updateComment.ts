import checkId from '../../validation/checkId.js';
import { Request, Response } from 'express';
import { updateCommentById } from '../../services/comment.js';

export const updateComment = async (request: Request, response: Response) => {
  try {
    const { movieId, commentId } = request.params;
    if (checkId(movieId) || checkId(commentId)) {
      return response.status(400).send(`Неверный формат идентификатора}`);
    }

    const { name, comment } = request.body;
    if (!name || !comment) {
      return response.status(400).send('name и comment обязателен');
    }

    const result = await updateCommentById(movieId, commentId, request.body);

    if (result) {
      return response.status(200).send(result);
    } else {
      return response.status(400).send(result);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
