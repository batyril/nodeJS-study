import { Category } from '../../models/Category.js';

export const addCategory = async (request, response) => {
  try {
    const { title } = request.body;
    await Category.create({ title });
    return response.status(201).send('categories created');
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
