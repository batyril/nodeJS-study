import { Request, Response } from 'express';
import { findFilmPerInterval } from '../../services/movie.js';
import { validationResult } from 'express-validator';

export const getMoviesPerInterval = async (
  request: Request,
  response: Response
) => {
  try {
    const { max, min } = request.query;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    if (typeof max === 'string' && typeof min === 'string') {
      const films = await findFilmPerInterval(Number(max), Number(min));
      response.send(films);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
