import checkId from '../../validation /checkId.js';
import { findByIdAndDelete } from '../../services/category.js';

export const deleteCategory = async (request, response) => {
  try {
    console.log('fsdfs');
    const id = request.params.id;

    if (checkId(id)) {
      return response.status(400).send(`Неверный формат идентификатора: ${id}`);
    }

    const category = await findByIdAndDelete(id);
    if (category) {
      response.send(`Категория удалена ${category}`);
    } else {
      response.send(`Не удалось найти категорию с ${id}`);
    }
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
