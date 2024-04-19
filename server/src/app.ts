import cors, { CorsOptions } from 'cors';
import express from 'express';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';
import { parse } from 'yaml';

import { errMiddleware } from './middleware/error-middleware.js';
import { createExpressRouter } from './router/index.js';

const swaggerDocument = fs.readFileSync('swagger.yml', 'utf8');

/** creates an instance of express application. */
export function createExpressApp(logRequests: boolean = true) {
  const app = express();
  app.set('views', 'src/views');
  app.set('view engine', 'ejs');

  const corsConfig: CorsOptions = {
    origin: '*',
  };

  // Middlewares
  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('src/public'));

  // Swagger UI
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(parse(swaggerDocument), {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'API Documentation',
    })
  );

  // Routes
  app.use('/', createExpressRouter(logRequests));

  // Catch all routes
  app.get('*', (_, res) => {
    res.redirect('/api-docs');
  });

  app.use(errMiddleware);

  return app;
}
