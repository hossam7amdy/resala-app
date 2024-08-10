import type { CorsOptions } from 'cors';
import cors from 'cors';
import express, { type Request, type Response } from 'express';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';
import { parse } from 'yaml';

import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { createExpressRouter } from './routes/index.js';

const swaggerDocument = fs.readFileSync('swagger.yml', 'utf8');

/** creates an instance of express application. */
export const createExpressApp = (logRequests: boolean = true) => {
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
  app.use(express.static('uploads')); // serve uploaded files
  app.use(express.static('src/public')); // serve static files

  // Swagger UI
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(parse(swaggerDocument), {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'API Documentation',
    })
  );

  app.use('/', createExpressRouter(logRequests));

  app.get('/uploads/*', (req: Request, res: Response) => {
    const filepath = req.params[0];

    const exist = fs.existsSync(`uploads/${filepath}`);

    if (!exist) {
      return res.status(404).send('File not found');
    }

    return res.sendFile(filepath, { root: 'uploads' });
  });

  // Catch all routes
  app.get('*', (_, res) => {
    res.status(404).send('Not found');
  });

  app.use(errorMiddleware);

  return app;
};
