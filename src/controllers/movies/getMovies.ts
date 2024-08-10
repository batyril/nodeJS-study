import { findMovies } from '../../services/movie.js';
import { Request, Response } from 'express';
import {
  getMoviesCache,
  hasMoviesCache,
  setMoviesCache,
} from '../../services/cache.js';

export const getMovies = async (request: Request, response: Response) => {
  try {
    const { sort, sortOrder } = request.query;
    const sortOrderValue =
      sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : undefined;

    const isCache = hasMoviesCache();

    if (isCache) {
      response.send(getMoviesCache());
      return;
    }

    const movies = await findMovies(
      request.query,
      String(sort),
      sortOrderValue
    );
    setMoviesCache(movies);
    response.send(movies);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
