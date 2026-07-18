import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { serverConfig } from './config/env';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { requestResponseLogger } from './middlewares/logger.middleware';
import v1Router from './routes/v1/index.routes';
import v2Router from './routes/v2/index.routes';

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: serverConfig.corsOrigin,
    credentials: true,
  })
);

// Body Parsing Middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Full Payload & Response Logger
app.use(requestResponseLogger);

// Request Logging
const skipFavicon = (req: express.Request) => req.originalUrl === '/favicon.ico';

if (serverConfig.isDevelopment) {
  app.use(morgan('dev', { skip: skipFavicon }));
} else {
  app.use(morgan('combined', { skip: skipFavicon }));
}

// API Routes
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// Base route for quick test
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to Express TypeScript Starter API',
    docs: '/api/v1/health',
    hotReload: true,
  });
});

// 404 Route Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
