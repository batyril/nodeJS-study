import { findMovies } from '../../services/movie.js';

export const getMovies = async (request, response) => {
  try {
    const movies = await findMovies();
    response.send(movies);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
