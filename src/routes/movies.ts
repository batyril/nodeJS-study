import { Router } from 'express';
import {
  addMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from '../controllers/movies/index.js';
import checkIds from '../middlewares/checkIds.js';
import { moviesChain, moviesFiltersChain } from '../validators/index.js';
import checkValidationErrors from '../middlewares/checkValidationErrors.js';

const moviesRouter = Router();

moviesRouter.get('/', moviesFiltersChain(), checkValidationErrors(), getMovies);

moviesRouter.post('/', moviesChain(), checkValidationErrors(), addMovie);

moviesRouter.put(
  '/:movieId',
  checkIds(['movieId']),
  moviesChain(),
  checkValidationErrors(),
  updateMovie
);

moviesRouter.delete('/:movieId', deleteMovie);

export default moviesRouter;
