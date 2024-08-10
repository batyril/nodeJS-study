import { Request, Response } from 'express';
import { findFilmPerInterval } from '../../services/movie.js';

export const getMoviesPerInterval = async (
  request: Request,
  response: Response
) => {
  try {
    const { max, min } = request.query;

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
