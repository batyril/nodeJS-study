import checkId from '../../validation /checkId.js';
import { updateMovieById } from '../../services/movie.js';

export const updateMovie = async (request, response) => {
  try {
    const id = request.params.id;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const result = await updateMovieById(id, request.body);

    if (result) {
      response.send(`Фильм изменен ${result}`);
    } else {
      response.send(`Не удалось найти фильм с id ${id}`);
    }
  } catch (error) {
    if (error.message === 'Нет полей для обновления') {
      return response.status(400).send(error.message);
    }
    return response.status(500).send(`Ошибка сервера: ${error.message}`);
  }
};
