import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

interface CustomError {
  statusCode: number;
  message: string;
}

export function errorHandler (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', err);

  // If it's our custom error type
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
    return ;
  }

  // For unknown errors
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
  return ;
};