import { Router } from 'express';
import { getDirectorFilmCount } from '../controllers/aggregates/getDirectorFilmCount.js';
import { getMoviesPerInterval } from '../controllers/aggregates/getMoviesPerInterval.js';
import { yearChain } from '../validators/index.js';

const aggregatesRouter = Router();

aggregatesRouter.get('/directorFilms', getDirectorFilmCount);
aggregatesRouter.get('/moviesPerInterval', yearChain(), getMoviesPerInterval);

export default aggregatesRouter;
