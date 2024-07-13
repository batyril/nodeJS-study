import { IMovie, Movie } from '../models/Movie.js';
import fs from 'node:fs/promises';

const requiredFields = ['title', 'year', 'duration', 'comments'];

const validateMovie = (movie: IMovie) => {
  return requiredFields.every((field) =>
    Object.prototype.hasOwnProperty.call(movie, field)
  );
};

export const readMoviesFile = async () => {
  try {
    const fileContent = await fs.readFile('movies.json', {
      encoding: 'utf8',
    });
    const movies = JSON.parse(fileContent);

    const validMovies = movies.every(validateMovie);

    if (!validMovies) {
      throw new Error(
        'Invalid movie data: one or more movies are missing required fields'
      );
    }

    return movies;
  } catch (err) {
    console.log('gdgdf');
  }
};

export const saveMovies = async () => {
  try {
    const count = await Movie.countDocuments();
    if (count === 0) {
      const movies = await readMoviesFile();
      return await Movie.insertMany(movies);
    }
  } catch (error) {
    console.error('Error saving movies:', error);
  }
};
