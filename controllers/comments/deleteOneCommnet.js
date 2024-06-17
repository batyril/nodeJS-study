import checkId from '../../validation /checkId.js';
import { removeComment } from '../../services/movie.js';

export const deleteOneComment = async (request, response) => {
  try {
    const { movieId, commentId } = request.params;
    if (checkId(movieId) || checkId(commentId)) {
      return response.status(400).send(`Неверный формат идентификатора}`);
    }

    const result = await removeComment(movieId, commentId);

    if (result.success) {
      return response.status(200).send(result);
    } else {
      return response.status(400).send(result);
    }
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
