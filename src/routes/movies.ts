import { Router } from 'express';
import {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from '../controllers/movies/index.js';
import verifyRequiredFields from '../middlewares/verifyRequiredFields.js';
import checkIds from '../middlewares/checkIds.js';
import verifyUpdateFields from '../middlewares/verifyUpdateFields.js';

const moviesRouter = Router();

moviesRouter.get('/', getMovies);

moviesRouter.get('/:movieId', getMovie);

moviesRouter.post(
  '/',
  verifyRequiredFields(['title', 'year', 'duration']),
  addMovie
);

moviesRouter.put(
  '/:movieId',
  checkIds(['movieId']),
  verifyUpdateFields,
  updateMovie
);

moviesRouter.delete('/:movieId', deleteMovie);

export default moviesRouter;
