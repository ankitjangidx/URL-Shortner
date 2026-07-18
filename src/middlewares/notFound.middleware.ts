import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
  next(error);
};
