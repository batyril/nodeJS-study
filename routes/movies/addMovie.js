import { createMovie } from '../../services/movie.js';

export const addMovie = async (request, response) => {
  try {
    const movie = createMovie(request.body);
    return response.status(201).send(`создать фильм с ${movie}`);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
