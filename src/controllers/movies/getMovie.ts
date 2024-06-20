import { findMovie } from '../../services/movie.js';
import { Request, Response } from 'express';

export const getMovie = async (request: Request, response: Response) => {
  try {
    const { movieId } = request.params;
    console.log(movieId);

    const movies = await findMovie(movieId);
    response.send(movies);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
