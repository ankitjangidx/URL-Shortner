import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getHealthStatus = asyncHandler(async (_req: Request, res: Response) => {
  console.log("hello")
  const healthInfo = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    status: 'OK',
  };

  res.status(200).json(new ApiResponse(200, healthInfo, 'Server health is optimal'));
});
