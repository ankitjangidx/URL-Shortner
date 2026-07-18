import mongoose from 'mongoose';
import app from './app';
import { serverConfig } from './config/env';
import connectDB from './config/db';
import { connectRedis, redisClient } from './config/redis';

const startServer = async () => {
  try {
    // 1. Connect to Databases first
    await connectDB();
    await connectRedis();

    // 2. Start Express HTTP server only after DB connections succeed
    const server = app.listen(serverConfig.port, () => {
      console.log(`🚀 Server is running at http://localhost:${serverConfig.port}`);
      console.log(`🔧 Environment: ${serverConfig.nodeEnv}`);
    });

    // 3. Graceful Shutdown handler
    const handleShutdown = async (_signal: string) => {
      server.close(async () => {
        await mongoose.connection.close();
        if (redisClient.isOpen) {
          await redisClient.quit();
        }
        process.exit(0);
      });

      setTimeout(() => {
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (reason: Error) => {
  console.error('Unhandled Rejection at:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception thrown:', error);
  process.exit(1);
});
