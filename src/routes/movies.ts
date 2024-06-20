import { Router } from 'express';
import {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from '../controllers/movies/index.js';
import {
  addComment,
  clearComments,
  deleteOneComment,
  getAllComments,
  getOneComment,
  updateComment,
} from '../controllers/comments/index.js';
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

//comments

moviesRouter.get(
  '/:movieId/comment/:commentId',
  checkIds(['movieId', 'commentId']),
  getOneComment
);

moviesRouter.get('/:movieId/comment', checkIds(['movieId']), getAllComments);

moviesRouter.delete('/:movieId/comment', checkIds(['movieId']), clearComments);

moviesRouter.delete(
  '/:movieId/comment/:commentId',
  checkIds(['movieId', 'commentId']),
  deleteOneComment
);

moviesRouter.put(
  '/:movieId/comment/:commentId',
  verifyRequiredFields(['comment', 'name']),
  checkIds(['movieId', 'commentId']),
  updateComment
);

moviesRouter.post(
  '/:movieId/comment',
  verifyRequiredFields(['comment', 'name']),
  addComment
);

export default moviesRouter;
