import { createCategory } from '../../services/category.js';

export const addCategory = async (request, response) => {
  try {
    const category = await createCategory(request.body);
    return response.status(201).send(`categories created ${category}`);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
