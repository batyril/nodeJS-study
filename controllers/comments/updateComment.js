import checkId from '../../validation /checkId.js';
import { updateCommentById } from '../../services/movie.js';

export const updateComment = async (request, response) => {
  try {
    const { movieId, commentId } = request.params;
    if (checkId(movieId) || checkId(commentId)) {
      return response.status(400).send(`Неверный формат идентификатора}`);
    }

    const { name, comment } = request.body;
    if (!name || !comment) {
      return response.status(400).send('name и comment обязателен');
    }

    const result = await updateCommentById(movieId, commentId, request.body);

    if (result.success) {
      return response.status(200).send(result);
    } else {
      return response.status(400).send(result);
    }
  } catch (error) {
    return response.status(500).send(`Ошибка сервера: ${error.message}`);
  }
};
