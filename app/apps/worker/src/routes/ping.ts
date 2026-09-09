import { Hono } from 'hono';
import type { Env } from '../types/env';
import { PingQuerySchema, type PingResponse } from '@myfashion/shared-types';

export const pingRouter = new Hono<{ Bindings: Env }>();

pingRouter.get('/', async (c) => {
  const queryResult = PingQuerySchema.safeParse(c.req.query());
  const echo = queryResult.success ? queryResult.data.echo : undefined;

  const response: PingResponse = {
    status: 'ok',
    message: echo ? `pong: ${echo}` : 'pong',
    timestamp: new Date().toISOString(),
    environment: c.env?.ENVIRONMENT || 'development',
    version: '1.0.0',
  };

  return c.json(response, 200);
});
