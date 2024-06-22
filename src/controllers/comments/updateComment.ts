import { Request, Response } from 'express';
import { updateCommentById } from '../../services/comment.js';
import { matchedData, validationResult } from 'express-validator';
import { IComment } from '../../models/Movie.js';

export const updateComment = async (request: Request, response: Response) => {
  try {
    const { movieId, commentId } = request.params;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const data = matchedData<IComment>(request);

    const result = await updateCommentById(movieId, commentId, data);

    if (result) {
      return response.status(200).send(result);
    } else {
      return response.status(400).send(result);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
