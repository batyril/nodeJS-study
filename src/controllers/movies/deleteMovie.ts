import { findByIdAndDeleteMovie } from '../../services/movie.js';
import checkId from '../../validation/checkId.js';
import { Request, Response } from 'express';

export const deleteMovie = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const movie = await findByIdAndDeleteMovie(id);
    if (movie) {
      response.send(`Фильм удален ${movie}`);
    } else {
      response.send(`Не удалось найти фильм с ${id}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
