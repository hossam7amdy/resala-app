import axios from 'axios';

import { isDev } from './util';

const API_HOST = isDev ? 'http://localhost:5000' : 'https://resala-app.onrender.com';

export default axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});
