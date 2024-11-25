import type { CorsOptions } from 'cors';
import cors from 'cors';
import express, { type Request, type Response } from 'express';
import fs from 'fs';
import helmet from 'helmet';
import passport from 'passport';
import swaggerUI from 'swagger-ui-express';
import { parse } from 'yaml';

import { configuration } from './configuration/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { loggerHandler } from './middlewares/loggerHandler.js';
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
    origin: [configuration.origin.allowedList],
  };

  // Middlewares
  app.use(cors(corsConfig));
  app.use(helmet());
  app.use(passport.initialize());
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

  RegisterRoutes(app); // Register TSOA routes

  app.post('/post_pay/:orderId', postPay); // Paymob webhook

  app.get('/uploads/*', (req: Request, res: Response) => {
    const filepath = req.params[0];

    const exist = fs.existsSync(`uploads/${filepath}`);

    if (!exist) {
      return res.status(404).send('File not found');
    }

    return res.sendFile(filepath, { root: 'uploads' });
  });

  app.use(views);

  // Catch all (unmatched) routes
  app.use((_, res) => {
    return res.status(404).send('Not found');
  });

  app.use(errorHandler);

  return app;
};
