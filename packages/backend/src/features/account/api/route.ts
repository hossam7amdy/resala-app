import { OpenAPIHono } from '@hono/zod-openapi';

import { authHandler } from './handler';

const authRoute = new OpenAPIHono();

authRoute.get('/auth/*', c => authHandler(c.req.raw)).post('/auth/*', c => authHandler(c.req.raw));

export { authRoute };
