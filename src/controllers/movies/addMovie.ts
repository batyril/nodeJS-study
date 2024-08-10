import { createMovie } from '../../services/movie.js';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { IMovie } from '../../models/Movie.js';
import { deleteMoviesCache } from '../../services/cache.js';

export const addMovie = async (request: Request, response: Response) => {
  try {
    const data = matchedData<IMovie>(request);

    const result = await createMovie(data);

    if (result) {
      deleteMoviesCache();
      response.status(201).send(`создан фильм  ${result}`);
    } else {
      response.send(`Не удалось добавить фильм`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
