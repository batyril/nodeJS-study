import moviesRouter from './movies.js';
import {
  addComment,
  clearComments,
  deleteOneComment,
  getAllComments,
  getOneComment,
  updateComment,
} from '../controllers/comments/index.js';

moviesRouter.get('/:movieId/comment/:commentId', getOneComment);

moviesRouter.get('/:movieId/comment', getAllComments);

moviesRouter.delete('/:movieId/comment', clearComments);

moviesRouter.delete('/:movieId/comment/:commentId', deleteOneComment);

moviesRouter.put('/:movieId/comment/:commentId', updateComment);

moviesRouter.post('/:movieId/comment', addComment);
