import { createMovie } from '../../services/movie.js';
import mongoose from 'mongoose';

export const addMovie = async (request, response) => {
  try {
    const movie = await createMovie(request.body);
    return response.status(201).send(`создан фильм с ${movie}`);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return response.status(400).send(e.message);
    }
    return response.status(500).send(e.message);
  }
};
