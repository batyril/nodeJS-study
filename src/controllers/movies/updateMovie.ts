import { updateMovieById } from '../../services/movie.js';
import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { IMovie } from '../../models/Movie.js';
import { deleteMoviesCache } from '../../services/cache.js';

export const updateMovie = async (request: Request, response: Response) => {
  try {
    const { movieId } = request.params;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const data = matchedData<IMovie>(request);

    const result = await updateMovieById(movieId, data);

    if (result) {
      deleteMoviesCache();
      response.send(`Фильм изменен ${result}`);
    } else {
      response.send(`Не удалось найти фильм с id ${movieId}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
