import { findMovies } from '../../services/movie.js';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getMoviesCache, setMoviesCache } from '../../services/cache.js';

export const getMovies = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { sort, sortOrder } = request.query;

    const isSortOrder = sortOrder === 'desc' ? 'desc' : 'asc';

    const isCache = getMoviesCache();

    if (isCache) {
      response.send(isCache);
      return;
    }

    const movies = await findMovies(request.query, String(sort), isSortOrder);
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
