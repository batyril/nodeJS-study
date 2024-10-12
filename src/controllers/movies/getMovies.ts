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

    if (isCache && !request.query) {
      response.send(getMoviesCache());
      return;
    }

    const TIMEOUT = 5 * 1000; // 5 секунд

    const checkTimeOut = new Promise((_, reject) => {
      setTimeout(async () => {
        reject(new Error('timeout error'));
      }, TIMEOUT);
    });

    const moviesPromise = findMovies(
      request.query,
      String(sort),
      sortOrderValue
    );

    const result = await Promise.race([moviesPromise, checkTimeOut]);
    setMoviesCache(result);

    response.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'not found') {
        return response.status(404).send(error);
      } else if (error.message === 'timeout error') {
        return response.status(504).send(error);
      }
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
