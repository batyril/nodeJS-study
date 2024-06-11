import { findMovie } from '../../services/movie.js';
import checkId from '../../validation /checkId.js';

export const getMovie = async (request, response) => {
  try {
    const id = request.params.id;
    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const movies = await findMovie(id);
    response.send(movies);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
