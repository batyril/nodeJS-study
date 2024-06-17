import checkId from '../../validation /checkId.js';
import { findByIdAndDelete } from '../../services/movie.js';

export const deleteMovie = async (request, response) => {
  try {
    const id = request.params.id;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const movie = await findByIdAndDelete(id);
    if (movie) {
      response.send(`Фильм удален ${movie}`);
    } else {
      response.send(`Не удалось найти фильм с ${id}`);
    }
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
