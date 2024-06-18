import checkId from '../../validation/checkId.js';
import { updateDirectorById } from '../../services/director.js';
import { Request, Response } from 'express';
import { IDirector } from '../../models/Director.js';

export const updateDirector = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    if (
      !Object.prototype.hasOwnProperty.call(request.body, 'name') ||
      !Object.prototype.hasOwnProperty.call(request.body, 'birthDate')
    ) {
      return response
        .status(400)
        .send('Оба поля name и birthDate должны быть указаны');
    }

    const fieldsToUpdate: Partial<IDirector> = {
      name: request.body.name,
      birthDate: request.body.birthDate,
    };

    const result = await updateDirectorById(id, fieldsToUpdate);

    if (result) {
      response.send(`Режиссер изменен: ${result}`);
    } else {
      response.status(404).send(`Не удалось найти режиссера с id ${id}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
