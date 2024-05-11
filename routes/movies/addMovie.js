import { Movie } from '../../models/Movie.js';

export const addMovie = async (request, response) => {
  try {
    const { title, year, rating } = request.body;
    await Movie.create({ title, year, rating });
    return response.status(201).send('movies created');
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
