import { createDirector } from '../../services/director.js';
import mongoose from 'mongoose';

export const addDirector = async (request, response) => {
  try {
    const director = await createDirector(request.body);
    return response.status(201).send(`director created ${director}`);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return response.status(400).send(error.message);
    }
    return response.status(500).send(`Ошибка сервера: ${error.message}`);
  }
};
