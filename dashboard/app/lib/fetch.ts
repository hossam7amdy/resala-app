import {
  DefaultRequestBody,
  DefaultRequestQuery,
  DefaultResponseBody,
  EndpointConfig,
} from '@resala/shared';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { isDev } from './util';

const API_HOST = isDev ? 'http://localhost:5000' : 'https://resala-app.onrender.com';

export const client = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function callEndpoint<
  Request extends {
    body?: DefaultRequestBody;
    query?: DefaultRequestQuery['query'];
  },
  Response = DefaultResponseBody,
>(endpoint: EndpointConfig, request?: Request): Promise<Response> {
  try {
    const { url, method, auth } = endpoint;

    const config: AxiosRequestConfig = {
      url,
      method,
      data: request?.body,
      params: request?.query,
    };

    const response = await client<Request, AxiosResponse<Response>>(config);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error?.response?.data;
    }
    throw new Error('Something went wrong.');
  }
}
