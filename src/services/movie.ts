import { IMovie, Movie } from '../models/Movie.js';

export const findDirectorFilmCount = async () => {
  return Movie.aggregate([
    { $group: { _id: '$director', count: { $sum: 1 } } },
    {
      $project: {
        _id: 0,
        director: '$_id',
        count: 1,
      },
    },
  ]).exec();
};

export const findFilmPerInterval = async (max: number, min: number) => {
  return Movie.aggregate([
    {
      $match: { year: { $gt: min, $lt: max } },
    },
  ]).exec();
};

export const createMovie = async ({
  title,
  category,
  year,
  duration,
  director,
}: IMovie): Promise<IMovie | null> => {
  return Movie.create({ title, category, year, duration, director });
};

export const findByIdAndDeleteMovie = async (
  id: string
): Promise<IMovie | null> => {
  return Movie.findByIdAndDelete(id, {
    new: true,
  });
};

//TODO: типипзировать   sortField: keyof IMovie,
export const findMovies = async (
  filters: Partial<IMovie>,
  sortField: string,
  sortOrder: 'asc' | 'desc'
): Promise<IMovie[] | null> => {
  const query = Movie.find();

  if (filters.title) {
    query.where('title', filters.title);
  }

  if (filters.year) {
    query.where('year', filters.year);
  }
  if (filters.id) {
    query.where('_id', filters.id);
  }

  if (filters.duration) {
    query.where('duration', filters.duration);
  }
  if (filters.director) {
    query.where('duration', filters.director);
  }

  if (sortField) {
    const sort = { [sortField]: sortOrder };
    query.sort(sort);
  }
  return query.exec();
};

export const findMovie = async (id: string): Promise<IMovie | null> => {
  return Movie.findById(id).populate('category').populate('director').lean();
};

export const updateMovieById = async (
  id: string,
  fieldsToUpdate: Partial<IMovie>
): Promise<IMovie | null> => {
  return Movie.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
};
