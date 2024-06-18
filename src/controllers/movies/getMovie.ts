import { findMovie } from '../../services/movie.js';
import checkId from '../../validation/checkId.js';
import { Request, Response } from 'express';

export const getMovie = async (request: Request, response: Response) => {
  try {
    const id = request.params.movieId;
    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const movies = await findMovie(id);
    response.send(movies);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
