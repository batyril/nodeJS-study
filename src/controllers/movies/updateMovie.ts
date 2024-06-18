import checkId from '../../validation/checkId.js';
import { updateMovieById } from '../../services/movie.js';
import { Request, Response } from 'express';
import getUpdatedFields from '../../validation/checkFileUpdate.js';

export const updateMovie = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const fieldsToUpdate = getUpdatedFields(request.body);

    if (!(Object.keys(fieldsToUpdate).length > 0)) {
      return response.status(400).send(`Нет полей для обновления`);
    }

    const result = await updateMovieById(id, fieldsToUpdate);

    if (result) {
      response.send(`Фильм изменен ${result}`);
    } else {
      response.send(`Не удалось найти фильм с id ${id}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
