import { createClient } from 'redis';
import { serverConfig } from './env';

export const redisClient = createClient({
  url: serverConfig.redisURI,
});

redisClient.on('error', (err: Error) => console.error('❌ Redis Client Error:', err));
redisClient.on('connect', () => console.log('⚡ Redis Connected'));

export const connectRedis = async (): Promise<void> => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
  }
};
