import checkId from '../../validation /checkId.js';
import { findFilmAndClearComments } from '../../services/movie.js';

export const clearComments = async (request, response) => {
  try {
    const movieId = request.params.movieId;

    if (checkId(movieId)) {
      return response
        .status(400)
        .send(`Неверный формат идентификатора: ${movieId}`);
    }

    const comments = await findFilmAndClearComments(movieId);
    if (comments) {
      response.status(200).send(`Комментарии удалены ${comments}`);
    } else {
      response.send(`Не удалось найти комментарии с ${movieId}`);
    }
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
