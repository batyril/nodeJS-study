import { updateMovieById } from '../../services/movie.js';
import { Request, Response } from 'express';

export const updateMovie = async (request: Request, response: Response) => {
  try {
    const { movieId } = request.params;

    const result = await updateMovieById(movieId, request.body);

    if (result) {
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
