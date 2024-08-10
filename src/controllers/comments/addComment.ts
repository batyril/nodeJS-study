import { Request, Response } from 'express';
import { createComment } from '../../services/comment.js';
import { matchedData } from 'express-validator';
import { IComment } from '../../models/Movie.js';

export const addComment = async (request: Request, response: Response) => {
  try {
    const { movieId } = request.params;

    const data = matchedData<IComment>(request);

    const result = await createComment(data, movieId);
    if (result) {
      return response.status(201).send(`комментарий добавлен ${result}`);
    } else {
      return response.send(`комментарий не добавлен`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
