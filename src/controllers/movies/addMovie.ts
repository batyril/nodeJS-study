import { createMovie } from '../../services/movie.js';
import { Request, Response } from 'express';

export const addMovie = async (request: Request, response: Response) => {
  try {
    const movie = await createMovie(request.body);
    return response.status(201).send(`создан фильм с ${movie}`);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
