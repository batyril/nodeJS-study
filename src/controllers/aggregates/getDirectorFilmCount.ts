import { Request, Response } from 'express';
import { findDirectorFilmCount } from '../../services/movie.js';
import { findDirector } from '../../services/director.js';

export const getDirectorFilmCount = async (
  request: Request,
  response: Response
) => {
  try {
    const countFilms = await findDirectorFilmCount();

    const v2 = await Promise.all(
      countFilms.map(async (data) => {
        const director = await findDirector(data.director);
        return { ...data, director: director?.name };
      })
    );

    response.send(v2);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).send(`Ошибка сервера: ${error.message}`);
    } else if (typeof error === 'string') {
      return response.status(500).send(error);
    }
  }
};
