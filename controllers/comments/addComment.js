import checkId from '../../validation /checkId.js';
import { createComment } from '../../services/movie.js';

export const addComment = async (request, response) => {
  try {
    const { name, comment } = request.body;
    if (!name || !comment) {
      return response.status(400).send('name и comment обязателен');
    }

    const id = request.params.movieId;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const result = await createComment(request.body, id);
    if (result) {
      return response.status(201).send(`комментарий добавлен ${result}`);
    } else {
      return response.send(`комментарий не добавлен`);
    }
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
