import type { CorsOptions } from 'cors';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import { parse } from 'yaml';

import { configuration } from './configuration/index.js';
import { jwtParse } from './middlewares/authentication.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { loggerHandler } from './middlewares/loggerHandler.js';
import { limiter } from './middlewares/rateLimiter.js';
import { RegisterRoutes } from './routes/api.routes.js';
import { views } from './views/index.js';
import { postPay } from './webhooks/paymob.js';

const swaggerDocument = fs.readFileSync('docs/swagger.yaml', 'utf8');

/** creates an instance of express application. */
export const createExpressApp = (logRequests: boolean = true) => {
  const app = express();

  app.set('views', 'src/views');
  app.set('view engine', 'ejs');

  const corsConfig: CorsOptions = {
    origin: configuration.origin.allowedList,
  };

  // Middlewares
  app.use(cors(corsConfig));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('uploads')); // serve uploaded files
  app.use(express.static('public')); // serve static files

  // Swagger UI
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(parse(swaggerDocument), {
      customSiteTitle: 'API Documentation',
    })
  );

  if (logRequests) app.use(loggerHandler);

  app.use(jwtParse);
  app.use(limiter());

  RegisterRoutes(app); // Register TSOA routes

  app.post('/post_pay/:orderId', postPay); // Paymob webhook

  app.use(views);

  // Catch all (unmatched) routes
  app.use((_, res) => {
    return res.status(404).send('Not found');
  });

  app.use(errorHandler);

  return app;
};
