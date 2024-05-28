import { Movie } from '../../models/Movie.js';

export const addMovie = async (request, response) => {
  try {
    const { title, category, year, duration, director } = request.body;
    await Movie.create({ title, category, year, duration, director });
    return response.status(201).send(`создать фильм с ${request.params.id}`);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
