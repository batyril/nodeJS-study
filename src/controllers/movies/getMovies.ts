import { findMovies } from '../../services/movie.js';
import { Request, Response } from 'express';

export const getMovies = async (request: Request, response: Response) => {
  try {
    const movies = await findMovies();
    response.send(movies);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
