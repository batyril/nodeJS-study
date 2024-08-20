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
import checkRoles from '../middlewares/checkRoles.js';
import checkAuth from '../middlewares/checkAuth.js';

const moviesRouter = Router();

//TODO: сделать получение фильмов только по названию и ограничить время

moviesRouter.get(
  '/',
  moviesFiltersChain(),
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  checkValidationErrors(),
  getMovies
);

moviesRouter.post(
  '/',
  moviesChain(),
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  checkValidationErrors(),
  addMovie
);

moviesRouter.put(
  '/:movieId',
  checkIds(['movieId']),
  moviesChain(),
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  checkValidationErrors(),
  updateMovie
);

moviesRouter.delete('/:movieId', deleteMovie);

export default moviesRouter;
