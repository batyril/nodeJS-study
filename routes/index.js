import { addCategory } from './categories/addCategory.js';
import { addMovie, deleteMovie, getMovies } from './movies/index.js';

const ROUTS = {
  BASE: '/',
  MOVIES: '/movies',
  CATEGORIES: '/categories',
};

export const addRoutes = (app) => {
  app.get(ROUTS.BASE, getMovies);
  app.post(ROUTS.MOVIES, addMovie);
  app.post(ROUTS.CATEGORIES, addCategory);
  app.delete(ROUTS.MOVIES, deleteMovie);
};
