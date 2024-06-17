import checkId from '../../validation /checkId.js';
import { findCategory } from '../../services/category.js';

export const getCategory = async (request, response) => {
  try {
    const id = request.params.id;
    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const movies = await findCategory(id);
    response.send(movies);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
