import { Movie } from '../../models/Movie.js';
import checkId from '../../validation /checkId.js';

export const addComment = async (request, response) => {
  try {
    const { name, comment } = request.body;
    if (!name || !comment) {
      return response.status(400).send('name и comment обязателен');
    }

    const id = request.params.id;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const filter = { $push: { comments: { name, comment } } };

    const result = await Movie.findByIdAndUpdate(id, filter, {
      new: true,
    });

    if (result) {
      return response.status(201).send(`комментарий добавлен ${result}`);
    } else {
      return response.send(`комментарий не добавлен`);
    }
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
