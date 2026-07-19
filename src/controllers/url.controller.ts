import z from 'zod';
import { Request, Response } from 'express';
import { publicProcedure } from '../routes/trpc/context';
import { UrlRepository } from '../repositories/url.repositories';
import { CacheRepository } from '../repositories/cache.repositories';
import { SUrlService } from '../services/surl.service';
import { InternalServerError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

export const UrlService = new SUrlService(new UrlRepository(), new CacheRepository());

export const UrlController = {
  create: publicProcedure
    .input(
      z.object({
        originalUrl: z.url('Invalid URL format'),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await UrlService.createShortUrl(input.originalUrl);
      } catch (error) {
        console.error(error);
        throw new InternalServerError('Failed to create short URL');
      }
    }),
  getOriginalUrl: publicProcedure
    .input(
      z.object({
        shortUrl: z.string().min(1, 'Short URL cannot be empty'),
      })
    )
    .query(async ({ input }) => {
      try {
        return await UrlService.getOriginalUrl(input.shortUrl);
      } catch (error) {
        console.error(error);
        throw new InternalServerError('Failed to get original URL');
      }
    }),
};

// Express HTTP handler for short URL redirection (GET /:shortUrl)
export const redirectController = asyncHandler(async (req: Request, res: Response) => {
  const shortUrl = req.params.shortUrl as string;
  const originalUrl = await UrlService.handleRedirect(shortUrl);
  return res.redirect(302, originalUrl);
});
