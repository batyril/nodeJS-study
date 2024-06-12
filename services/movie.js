import { Movie } from '../models/Movie.js';
import getUpdatedFields from '../validation /checkFileUpdate.js';
// TODO: вынести в отдельные файлы

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
  const movies = Movie.find();
  if (movies) {
    return movies;
  }
  return 'фильмов еще нет';
};

export const findMovie = async (id) => {
  return Movie.findById(id);
};

export const updateMovieById = async (id, body) => {
  const fieldsToUpdate = getUpdatedFields(body);

  if (Object.keys(fieldsToUpdate).length > 0) {
    return Movie.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
  } else {
    throw new Error('Нет полей для обновления');
  }
};

export async function findFilmAndClearComments(movieId) {
  try {
    return await Movie.findByIdAndUpdate(
      movieId,
      { $set: { comments: [] } },
      { new: true }
    );
  } catch (error) {
    console.error('Error clearing comments:', error);
  }
}

export async function removeComment(movieId, commentId) {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return {
        success: false,
        message: 'Movie not found.',
      };
    }

    const commentExists = movie.comments.some(
      (comment) => comment._id.toString() === commentId
    );
    if (!commentExists) {
      return {
        success: false,
        message: 'Comment not found.',
      };
    }
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (updatedMovie) {
      return {
        success: true,
        message: 'Comment removed successfully.',
        movie: updatedMovie,
      };
    } else {
      return {
        success: false,
        message: 'Failed to update movie.',
      };
    }
  } catch (error) {
    console.error('Error removing comment:', error);
    return {
      success: false,
      message: 'An error occurred while removing the comment.',
      error: error.message,
    };
  }
}

export const updateCommentById = async (movieId, commentId, updatedFields) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return {
        success: false,
        message: 'Movie not found.',
      };
    }

    const comment = movie.comments.id(commentId);
    if (!comment) {
      return {
        success: false,
        message: 'Comment not found.',
      };
    }

    const result = await Movie.findOneAndUpdate(
      { _id: movieId, 'comments._id': commentId },
      {
        $set: {
          'comments.$.name': updatedFields.name,
          'comments.$.comment': updatedFields.comment,
        },
      },
      { new: true }
    );

    if (!result) {
      return {
        success: false,
        message: 'Movie or Comment not found.',
      };
    }

    return {
      success: true,
      message: 'Comment updated successfully.',
      result,
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while updating the comment.',
      error: error.message,
    };
  }
};
