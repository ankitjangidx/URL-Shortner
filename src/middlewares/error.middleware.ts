import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { serverConfig } from '../config/env';

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: string[] = [];
  const stack = serverConfig.isDevelopment ? err.stack : undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    ...(stack && { stack }),
  });
};
