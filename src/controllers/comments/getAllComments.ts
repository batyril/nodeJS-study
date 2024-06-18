import checkId from '../../validation/checkId.js';
import { findMovie } from '../../services/movie.js';
import { Request, Response } from 'express';
import { IMovie } from '../../models/Movie.js';

export const getAllComments = async (request: Request, response: Response) => {
  try {
    const id = request.params.movieId;
    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }
    const movie: IMovie | null = await findMovie(id);
    if (!movie) {
      return response
        .status(404)
        .send(`Фильм с идентификатором ${id} не найден`);
    }

    const { comments } = movie;

    response.send(comments);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
