import { OpenAPIHono } from '@hono/zod-openapi';

import { authHandler } from './handler';

const authRoute = new OpenAPIHono();

authRoute
  .get('/api/auth/*', c => authHandler(c.req.raw))
  .post('/api/auth/*', c => authHandler(c.req.raw));

export { authRoute };
