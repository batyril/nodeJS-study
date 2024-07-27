import { Router } from 'express';
import {
  addMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from '../controllers/movies/index.js';
import checkIds from '../middlewares/checkIds.js';
import { moviesChain, moviesFiltersChain } from '../validators/index.js';

const moviesRouter = Router();

moviesRouter.get('/', moviesFiltersChain(), getMovies);

moviesRouter.post('/', moviesChain(), addMovie);

moviesRouter.put(
  '/:movieId',
  checkIds(['movieId']),
  moviesChain(),
  updateMovie
);

moviesRouter.delete('/:movieId', deleteMovie);

export default moviesRouter;
