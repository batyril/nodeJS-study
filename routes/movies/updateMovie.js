import { Movie } from '../../models/Movie.js';
import checkId from '../../validation /checkId.js';
import getUpdatedFields from '../../validation /checkFileUpdate.js';

export const updateMovie = async (request, response) => {
  try {
    const id = request.params.id;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const fieldsToUpdate = getUpdatedFields(request.body);

    const isCheckFields = Object.keys(fieldsToUpdate).length > 0;

    if (isCheckFields) {
      const result = await Movie.findByIdAndUpdate(id, fieldsToUpdate, {
        new: true,
      });

      if (result) {
        response.send(`Фильм изменен ${result}`);
      } else {
        response.send(`Не удалось найти фильм с id ${id}`);
      }
    } else {
      response.send('Нет полей для обновления');
    }
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
