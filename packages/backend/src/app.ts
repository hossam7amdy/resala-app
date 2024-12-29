import { configuration } from '@/configuration';
import { authRoute, generateOpenAPISchema } from '@/features/account';
import {
  addressHandler,
  cartHandler,
  categoryHandler,
  dashboardHandler,
  orderHandler,
  productHandler,
  reviewHandler,
  wishlistHandler,
} from '@/handlers';
import { enforceSession, errorHandler, parseSession } from '@/middlewares';
import { mergeDeep } from '@/utils/mergeDeep';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';

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

app.get('/api/docs', async c => {
  const authSchema = await generateOpenAPISchema();
  const storefrontSchema = app.getOpenAPIDocument({
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'Resala storefront APIs',
      description: 'APIs for the Resala storefront',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server',
      },
      {
        url: 'https://api.resala.live',
        description: 'Development server',
      },
    ],
    security: [{ apiKeyCookie: [] }],
  });

  const mergedSchema = mergeDeep(authSchema, storefrontSchema);
  return c.json(mergedSchema);
});
app.get('/api/reference', swaggerUI({ url: '/api/docs' }));

app
  .route('/', authRoute)
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

export default app;
