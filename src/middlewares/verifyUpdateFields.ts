import { NextFunction, Request, Response } from 'express';
import { IMovie } from '../models/Movie.js';

const verifyUpdateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedFields: (keyof IMovie)[] = [
    'title',
    'category',
    'year',
    'duration',
    'director',
  ];
  const hasValidField = allowedFields.some(
    field => req.body[field] !== undefined
  );

  if (!hasValidField) {
    return res.status(400).send('Нет полей для обновления');
  }

  next();
};

export default verifyUpdateFields;
