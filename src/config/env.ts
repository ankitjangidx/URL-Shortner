import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export type ServerConfig = {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
  isProduction: boolean;
  isDevelopment: boolean;
  mongoURI: string;
  redisURI: string;
  REDIS_COUTNER_KEY: string;
  BASE_URL: string
};

export const serverConfig: ServerConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/express_starter',
  redisURI: process.env.REDIS_URI || 'redis://localhost:6379',
  REDIS_COUTNER_KEY: process.env.REDIS_COUTNER_KEY || 'url_shortner_counter',
  BASE_URL: process.env.BASE_URL || "https://bit"
};


