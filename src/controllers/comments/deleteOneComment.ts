import { Request, Response } from 'express';
import { removeComment } from '../../services/comment.js';

export const deleteOneComment = async (
  request: Request,
  response: Response
) => {
  try {
    const { movieId, commentId } = request.params;

    const result = await removeComment(movieId, commentId);

    return response.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'Movie not found.':
        case 'Comment not found.':
          return response.status(404).send(error.message);
        case 'Failed to update movie.':
          return response.status(400).send(error.message);
        default:
          return response.status(500).send(`Ошибка сервера: ${error.message}`);
      }
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
