import { createCategory } from '../../services/category.js';
import mongoose from 'mongoose';

export const addCategory = async (request, response) => {
  try {
    const category = await createCategory(request.body);
    return response.status(201).send(`categories created ${category}`);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return response.status(400).send(error.message);
    }
    return response.status(500).send(`Ошибка сервера: ${error.message}`);
  }
};
