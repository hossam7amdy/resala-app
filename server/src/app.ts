import cors, { CorsOptions } from 'cors';
import express from 'express';
import path from 'path';

import { errMiddleware } from './middleware/error-middleware';
import api from './router';

const app = express();

const corsConfig: CorsOptions = {
  origin: '*',
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', api);

app.get('*', (_, res) => {
  return res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use(errMiddleware);

export default app;
