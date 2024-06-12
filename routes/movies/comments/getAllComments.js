import checkId from '../../../validation /checkId.js';
import { findMovie } from '../../../services/movie.js';

export const getAllComments = async (request, response) => {
  try {
    const id = request.params.movieId;
    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }
    const { comments } = await findMovie(id);
    response.send(comments);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
