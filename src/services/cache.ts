import NodeCache from 'node-cache';
import { IMovie } from '../models/Movie.js';

const moviesCache = new NodeCache();

export const setMoviesCache = (value: IMovie[] | null) => {
  const tenMinutes = 600000;
  const success = moviesCache.set('movies', value, tenMinutes);

  if (success) {
    console.log('Успешно записано в кэш');
  } else {
    console.error('Ошибка при записи в кэш');
  }
};

export const getMoviesCache = () => {
  return moviesCache.get('movies');
};

export const deleteMoviesCache = () => {
  const result = moviesCache.del('movies');
  if (!result) {
    console.error('Ошибка при удалении с кэша');
  }
  return result;
};
