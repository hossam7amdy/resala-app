import axios from 'axios';

export default axios.create({
  baseURL: process.env.API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});
