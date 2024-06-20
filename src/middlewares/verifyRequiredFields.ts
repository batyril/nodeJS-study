import { NextFunction, Request, Response } from 'express';

const verifyRequiredFields = (fields: string[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const missingFields = fields.filter(field => !(field in request.body));

    if (missingFields.length > 0) {
      return response
        .status(400)
        .send(`Поля ${missingFields.join(', ')} обязательные`);
    }
    next();
  };
};

export default verifyRequiredFields;
