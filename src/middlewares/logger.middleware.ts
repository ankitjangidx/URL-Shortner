import { Request, Response, NextFunction } from 'express';

/**
 * Custom logging middleware that logs incoming request details,
 * request query/body payload, response status, duration, and response body.
 */
export const requestResponseLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Skip logging for browser favicon requests
  if (req.originalUrl === '/favicon.ico') {
    return next();
  }

  const startTime = Date.now();
  const { method, originalUrl, query, body } = req;

  // Intercept res.send to capture response body
  const originalSend = res.send;
  let responseBody: unknown;

  res.send = function (content: unknown): Response {
    responseBody = content;
    return originalSend.call(this, content);
  };

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    console.log('\n--- 📥 Incoming Request ---');
    console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} -> Status: ${statusCode} (${duration}ms)`);

    if (query && Object.keys(query).length > 0) {
      console.log('🔍 Query Params:', JSON.stringify(query, null, 2));
    }

    if (body && Object.keys(body).length > 0) {
      console.log('📦 Request Payload:', JSON.stringify(body, null, 2));
    }

    if (responseBody !== undefined) {
      try {
        const parsed = typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody;
        console.log('📤 Response Payload:', JSON.stringify(parsed, null, 2));
      } catch {
        console.log('📤 Response Payload:', responseBody);
      }
    }
    console.log('---------------------------\n');
  });

  next();
};
