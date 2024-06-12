import checkId from '../../../validation /checkId.js';
import { findMovie } from '../../../services/movie.js';

export const getOneComment = async (request, response) => {
  try {
    const { movieId, commentId } = request.params;
    if (checkId(movieId) || checkId(commentId)) {
      return response.status(400).send(`Неверный формат идентификатора}`);
    }
    const movies = await findMovie(movieId);
    if (!movies) {
      return response.status(404).send('Movie not found');
    }

    const comment = movies.comments.id(commentId);

    if (!comment) {
      return response.status(404).send('Comment not found');
    }

    response.status(200).send(comment);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
