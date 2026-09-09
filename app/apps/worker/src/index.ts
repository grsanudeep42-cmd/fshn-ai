import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types/env';
import { pingRouter } from './routes/ping';

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for frontend clients (Next.js)
app.use(
  '*',
  cors({
    origin: (origin) => origin || '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
);

// Mount routes
app.route('/api/ping', pingRouter);

// Root healthcheck
app.get('/', (c) => {
  return c.json({
    service: 'myfashion-worker',
    status: 'running',
    docs: '/api/ping',
  });
});

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: 'Not Found',
      timestamp: new Date().toISOString(),
    },
    404
  );
});

// Error handler
app.onError((err, c) => {
  console.error('Worker Error:', err);
  return c.json(
    {
      success: false,
      error: err.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
    },
    500
  );
});

export default app;
