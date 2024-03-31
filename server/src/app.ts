import cors, { CorsOptions } from 'cors';
import express from 'express';
import path from 'path';
import swaggerUI from 'swagger-ui-express';

import { errMiddleware } from './middleware/error-middleware';
import { createExpressRouter } from './router';
import swaggerDocument from './swagger.json';

/** creates an instance of express application. */
export function createExpressApp(logRequests: boolean = true) {
  const app = express();

  const corsConfig: CorsOptions = {
    origin: '*',
  };

  // Middlewares
  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Swagger UI
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'API Documentation',
    })
  );

  // Routes
  app.use('/', createExpressRouter(logRequests));

  // Catch all routes
  app.get('*', (_, res) => {
    return res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  app.use(errMiddleware);

  return app;
}
