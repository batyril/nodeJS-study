import { Request, Response } from 'express';
import { findFilmAndClearComments } from '../../services/comment.js';

export const clearComments = async (request: Request, response: Response) => {
  try {
    const { movieId } = request.params;

    const comments = await findFilmAndClearComments(movieId);
    if (comments) {
      response.status(200).send(`Комментарии удалены ${comments}`);
    } else {
      response.send(`Не удалось найти комментарии с ${movieId}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
