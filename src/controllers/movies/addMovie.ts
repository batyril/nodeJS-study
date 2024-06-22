import { createMovie } from '../../services/movie.js';
import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { IMovie } from '../../models/Movie.js';

export const addMovie = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const data = matchedData<IMovie>(request);

    const movie = await createMovie(data);
    return response.status(201).send(`создан фильм с ${movie}`);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
