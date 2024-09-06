import { ApiError } from '@/fetch';
import axios from 'axios';
import type { AxiosError } from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.API_HOST,
});

httpClient.interceptors.response.use(
  response => response.data,
  async (error: AxiosError<{ message: string }>) => {
    if (error.response?.data) {
      return Promise.reject(new ApiError(error.response.status, error.response.data.message));
    }
    return Promise.reject(new ApiError(error.status ?? 500, error.message));
  }
);
