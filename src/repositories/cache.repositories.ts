import { serverConfig } from '../config/env';
import { redisClient } from '../config/redis';

export class CacheRepository {
  async getNextId(): Promise<number> {
    const key = serverConfig.REDIS_COUTNER_KEY;
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    const nextId = await redisClient.incr(key);
    return nextId;
  }
  async setUrlMapping(shortUrl: string, originalUrl: string) {
    const key = `url:${shortUrl}`;
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    await redisClient.set(key, originalUrl, {
      expiration: {
        type: 'EX',
        value: 60 * 60 * 24 * 30, // 30 days
      },
    });
  }

  async getUrlMapping(shortUrl: string): Promise<string | null> {
    const key = `url:${shortUrl}`;
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    const originalUrl = await redisClient.get(key);
    return originalUrl;
  }
}
