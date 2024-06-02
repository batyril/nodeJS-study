import { Router } from 'express';
import { addMovie } from './addMovie.js';
import { getMovies } from './getMovies.js';
import { updateMovie } from './updateMovie.js';
import { deleteMovie } from './deleteMovie.js';
import { addComment } from './addComment.js';
const moviesRouter = Router();

moviesRouter.get('/', getMovies);

moviesRouter.post('/:id', addMovie);

moviesRouter.post('/:id/comment', addComment);

moviesRouter.put('/:id', updateMovie);

moviesRouter.delete('/:id', deleteMovie);

export default moviesRouter;
