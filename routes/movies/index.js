import { Router } from 'express';
import { addMovie } from './addMovie.js';
import { getMovies } from './getMovies.js';
import { updateMovie } from './updateMovie.js';
import { deleteMovie } from './deleteMovie.js';
import { addComment } from './addComment.js';
import { getMovie } from './getMovie.js';

const moviesRouter = Router();

moviesRouter.get('/', getMovies);

moviesRouter.get('/:id', getMovie);

moviesRouter.post('/:id', addMovie);

moviesRouter.put('/:id', updateMovie);

moviesRouter.delete('/:id', deleteMovie);

moviesRouter.post('/:id/comment', addComment);

export default moviesRouter;
