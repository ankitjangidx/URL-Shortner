import { serverConfig } from '../config/env';
import { CacheRepository } from '../repositories/cache.repositories';
import { UrlRepository } from '../repositories/url.repositories';
import { NotFoundError } from '../utils/ApiError';
import { toBase62 } from '../utils/base62';

export class SUrlService {
  constructor(
    private readonly UrlRepository: UrlRepository,
    private readonly CacheRepository: CacheRepository
  ) {}

  async createShortUrl(originalUrl: string) {
    const nextId = await this.CacheRepository.getNextId();
    const shortUrl = toBase62(nextId);
    const url = await this.UrlRepository.create({ shortUrl, originalUrl });
    await this.CacheRepository.setUrlMapping(shortUrl, originalUrl);

    const fullUrl = `${serverConfig.BASE_URL}/${shortUrl}`;

    return {
      id: url._id.toString(),
      shortUrl: url.shortUrl,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      fullUrl,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    };
  }

  async getOriginalUrl(shortUrl: string) {
    const originalUrl = await this.CacheRepository.getUrlMapping(shortUrl);
    if (originalUrl) {
      return {
        originalUrl,
        shortUrl,
      };
    } else {
      const url = await this.UrlRepository.findByShortUrl(shortUrl);
      if (!url) {
        throw new NotFoundError('URL not found');
      }
      await this.CacheRepository.setUrlMapping(shortUrl, url.originalUrl);
      return {
        originalUrl: url.originalUrl,
        shortUrl,
      };
    }
  }

  // 2. User Click & Redirection Handler (Increments click counter & returns original URL)
  async handleRedirect(shortUrl: string) {
    const { originalUrl } = await this.getOriginalUrl(shortUrl);
    await this.UrlRepository.incrementClick(shortUrl);
    return originalUrl;
  }
}
