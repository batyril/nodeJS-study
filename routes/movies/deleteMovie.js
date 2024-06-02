import { Movie } from '../../models/Movie.js';
import checkId from '../../validation /checkId.js';

export const deleteMovie = async (request, response) => {
  try {
    const id = request.params.id;
    console.log(checkId(id));

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const result = await Movie.findByIdAndDelete(id);
    if (result) {
      response.send(`Фильм удален с id${id}`);
    } else {
      response.send(`Не удалось найти фильм с ${id}`);
    }
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
