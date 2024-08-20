import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

//TODO: заменить на express validator
const checkIds = (paramNames: string[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    for (const paramName of paramNames) {
      const id = request.params[paramName];

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response
          .status(400)
          .send(`Неверный формат идентификатора: ${id}`);
      }
    }

    next();
  };
};

export default checkIds;
