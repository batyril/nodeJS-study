import { findByIdAndDeleteMovie } from '../../services/movie.js';
import { Request, Response } from 'express';
import { deleteMoviesCache } from '../../services/cache.js';

export const deleteMovie = async (request: Request, response: Response) => {
  try {
    const { movieId } = request.params;

    const movie = await findByIdAndDeleteMovie(movieId);
    if (movie) {
      deleteMoviesCache();
      response.send(`Фильм удален ${movie}`);
    } else {
      response.send(`Не удалось найти фильм с ${movieId}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
