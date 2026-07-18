import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

export const getSampleData = asyncHandler(async (_req: Request, res: Response) => {
  const data = [
    { id: 1, name: 'Item One', category: 'Sample' },
    { id: 2, name: 'Item Two', category: 'Sample' },
  ];

  res.status(200).json(new ApiResponse(200, data, 'Fetched sample items successfully'));
});

export const triggerError = asyncHandler(async (_req: Request, _res: Response) => {
  throw new ApiError(400, 'This is a custom API error for testing error middleware');
});
