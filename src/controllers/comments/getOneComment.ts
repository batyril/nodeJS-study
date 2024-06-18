import checkId from '../../validation/checkId.js';
import { findMovie } from '../../services/movie.js';
import { Request, Response } from 'express';

export const getOneComment = async (request: Request, response: Response) => {
  try {
    const { movieId, commentId } = request.params;
    if (checkId(movieId) || checkId(commentId)) {
      return response.status(400).send(`Неверный формат идентификатора}`);
    }
    const movie = await findMovie(movieId);
    if (!movie) {
      return response.status(404).send('Movie not found');
    }

    const comment = movie.comments.id(commentId);

    if (!comment) {
      return response.status(404).send('Comment not found');
    }

    response.status(200).send(comment);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
