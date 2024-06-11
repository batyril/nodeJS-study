import { findCategories } from '../../services/category.js';

export const getCategories = async (request, response) => {
  try {
    const categories = await findCategories();
    response.send(categories);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
