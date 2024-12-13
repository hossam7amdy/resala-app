import { configuration } from '@/configuration';
import { auth } from '@/lib/auth';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

import {
  addressHandler,
  cartHandler,
  categoryHandler,
  dashboardHandler,
  orderHandler,
  productHandler,
  reviewHandler,
  wishlistHandler,
} from './handlers';
import { enforceSession, errorHandler, parseSession } from './middlewares';

export const dynamic = 'force-dynamic';

const app = new OpenAPIHono();

app
  .use(
    cors({
      origin: configuration().trustedOrigins,
      allowHeaders: ['Authorization', 'Content-Type'],
      allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    })
  )
  .use(parseSession);

app.doc('/api/docs', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'Resala storefront APIs',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
    {
      url: 'https://api.resala.live',
      description: 'Development server',
    },
  ],
  security: [
    {
      basicAuth: [],
    },
  ],
});

app.get('/api/reference', swaggerUI({ url: '/api/docs' }));

app
  .get('/api/auth/*', c => auth.handler(c.req.raw))
  .post('/api/auth/*', c => auth.handler(c.req.raw));

app
  .route('/api/v1/categories', categoryHandler)
  .route('/api/v1/dashboard', dashboardHandler)
  .route('/api/v1/products', productHandler)
  .use(enforceSession) // All routes below this line require a valid session
  .route('/api/v1/cart', cartHandler)
  .route('/api/v1/orders', orderHandler)
  .route('/api/v1/reviews', reviewHandler)
  .route('/api/v1/wishlist', wishlistHandler)
  .route('/api/v1/addresses', addressHandler);

app.onError((_, c) => errorHandler(c));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
