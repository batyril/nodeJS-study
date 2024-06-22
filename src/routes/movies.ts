import { Router } from 'express';
import {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from '../controllers/movies/index.js';
import checkIds from '../middlewares/checkIds.js';
import { moviesChain } from '../validators/index.js';

const moviesRouter = Router();

moviesRouter.get('/', getMovies);

moviesRouter.get('/:movieId', getMovie);

moviesRouter.post('/', moviesChain(), addMovie);

moviesRouter.put(
  '/:movieId',
  checkIds(['movieId']),
  moviesChain(),
  updateMovie
);

moviesRouter.delete('/:movieId', deleteMovie);

export default moviesRouter;
