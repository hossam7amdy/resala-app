import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.PAYMOB_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
