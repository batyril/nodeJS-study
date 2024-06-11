import { createCategory } from '../../services/category.js';

export const addCategory = async (request, response) => {
  try {
    const category = await createCategory(request.body);
    return response.status(201).send(`categories created ${category}`);
  } catch (error) {
    if (error.message === 'Нет полей для обновления') {
      return response.status(400).send(error.message);
    }
    return response.status(500).send(`Ошибка сервера: ${error.message}`);
  }
};
