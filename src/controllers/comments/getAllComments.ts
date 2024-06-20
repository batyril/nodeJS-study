import { findMovie } from '../../services/movie.js';
import { Request, Response } from 'express';
import { IMovie } from '../../models/Movie.js';

export const getAllComments = async (request: Request, response: Response) => {
  try {
    const { movieId } = request.params;

    const movie: IMovie | null = await findMovie(movieId);
    if (!movie) {
      return response
        .status(404)
        .send(`Фильм с идентификатором ${movieId} не найден`);
    }

    const { comments } = movie;

    response.send(comments);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
