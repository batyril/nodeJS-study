import { IComment, IMovie, Movie } from '../models/Movie.js';

export const createComment = async (
  { name, comment }: IComment,
  id: string
): Promise<IMovie | null> => {
  const filter = { $addToSet: { comments: { name, comment } } };
  return Movie.findByIdAndUpdate(id, filter, {
    new: true,
  });
};

export async function findFilmAndClearComments(
  movieId: string
): Promise<IMovie | null> {
  return Movie.findByIdAndUpdate(
    movieId,
    { $set: { comments: [] } },
    { new: true }
  );
}

export async function removeComment(movieId: string, commentId: string) {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error('Movie not found.');
    }

    const commentExists = movie.comments.some((comment) => {
      return comment._id && comment._id.toString() === commentId;
    });

    if (!commentExists) {
      throw new Error('Comment not found.');
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!updatedMovie) {
      throw new Error('Failed to update movie.');
    }

    return updatedMovie;
  } catch (error) {
    console.error('Error removing comment:', error);
    throw error;
  }
}

export const updateCommentById = async (
  movieId: string,
  commentId: string,
  updatedFields: Partial<IComment>
) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error('Movie not found.');
    }

    const comment = movie.comments.id(commentId);

    if (!comment) {
      throw new Error('Comment not found.');
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
      throw new Error('Movie or Comment not found.');
    }

    return result;
  } catch (error) {
    console.error('Error removing comment:', error);
    throw error;
  }
};
