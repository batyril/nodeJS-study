import { Router } from 'express';
import {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from '../controllers/movies/index.js';

const moviesRouter = Router();
// TODO: сделать валидацию на уровне роута
moviesRouter.get('/', getMovies);

moviesRouter.get('/:movieId', getMovie);

moviesRouter.post('/', addMovie);

moviesRouter.put('/:movieId', updateMovie);

moviesRouter.delete('/:movieId', deleteMovie);
export default moviesRouter;
