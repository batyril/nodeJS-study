import { Movie } from '../models/Movie.js';
import getUpdatedFields from '../validation /checkFileUpdate.js';

export const createMovie = async ({
  title,
  category,
  year,
  duration,
  director,
}) => {
  // TODO: добавить валидацию для значений
  return Movie.create({ title, category, year, duration, director });
};

export const createComment = async ({ name, comment }, id) => {
  const filter = { $push: { comments: { name, comment } } };
  return Movie.findByIdAndUpdate(id, filter, {
    new: true,
  });
};

export const findByIdAndDelete = async (id) => {
  return Movie.findByIdAndDelete(id, {
    new: true,
  });
};

export const findMovies = async () => {
  return Movie.find();
};

export const updateMovieById = async (id, body) => {
  const fieldsToUpdate = getUpdatedFields(body);

  if (Object.keys(fieldsToUpdate).length > 0) {
    return Movie.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
  } else {
    throw new Error('Нет полей для обновления');
  }
};
