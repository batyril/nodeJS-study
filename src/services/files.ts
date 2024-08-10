import { IMovie, Movie } from '../models/Movie.js';
import fs from 'node:fs/promises';

const requiredFields = ['title', 'year', 'duration', 'comments'];

const validateMovie = (movie: IMovie) => {
  return requiredFields.every((field) =>
    Object.prototype.hasOwnProperty.call(movie, field)
  );
};

export const uploadFile = async (path: 'movies.json') => {
  try {
    const fileContent = await fs.readFile(path, {
      encoding: 'utf8',
    });
    return JSON.parse(fileContent);
  } catch (error) {
    if (error instanceof Error) {
      console.log('error during file upload', error.message);
    } else if (typeof error === 'string') {
      console.log('error during file upload', error);
    }
  }
};

export const addToDB = async () => {
  try {
    const countMovies = await Movie.countDocuments();
    if (countMovies === 0) {
      const movies = await uploadFile('movies.json');
      const validMovies = movies.every(validateMovie);
      if (!validMovies) {
        throw new Error(
          'Invalid movie data: one or more movies are missing required fields'
        );
      }
      return await Movie.insertMany(movies);
    }
  } catch (error) {
    console.error('Error saving movies:', error);
  }
};
