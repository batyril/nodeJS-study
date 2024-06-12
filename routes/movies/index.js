import { Router } from 'express';

// TODO: сделать импорты с одной точки
import { getMovie } from './getMovie.js';
import { addMovie } from './addMovie.js';
import { getMovies } from './getMovies.js';
import { updateMovie } from './updateMovie.js';
import { deleteMovie } from './deleteMovie.js';

// TODO: сделать импорты с одной точки
import { addComment } from './comments/addComment.js';
import { getAllComments } from './comments/getAllComments.js';
import { getOneComment } from './comments/getOneComment.js';
import { clearComments } from './comments/clearComments.js';
import { deleteOneComment } from './comments/deleteOneCommnet.js';
import { updateComment } from './comments/updateComment.js';

const moviesRouter = Router();

moviesRouter.get('/', getMovies);

moviesRouter.get('/:movieId', getMovie);

moviesRouter.post('/:movieId', addMovie);

moviesRouter.put('/:movieId', updateMovie);

moviesRouter.delete('/:movieId', deleteMovie);

// comment

moviesRouter.get('/:movieId/comment', getAllComments);

moviesRouter.delete('/:movieId/comment', clearComments);

moviesRouter.delete('/:movieId/comment/:commentId', deleteOneComment);
moviesRouter.put('/:movieId/comment/:commentId', updateComment);

moviesRouter.get('/:movieId/comment/:commentId', getOneComment);

moviesRouter.post('/:movieId/comment', addComment);

export default moviesRouter;
