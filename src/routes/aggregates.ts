import { Router } from 'express';
import { getDirectorFilmCount } from '../controllers/aggregates/getDirectorFilmCount.js';
import { getMoviesPerInterval } from '../controllers/aggregates/getMoviesPerInterval.js';
import { yearChain } from '../validators/index.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkRoles from '../middlewares/checkRoles.js';

const aggregatesRouter = Router();

aggregatesRouter.get(
  '/directorFilms',
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  getDirectorFilmCount
);
aggregatesRouter.get(
  '/moviesPerInterval',
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  yearChain(),
  getMoviesPerInterval
);

export default aggregatesRouter;
