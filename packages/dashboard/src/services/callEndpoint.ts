'use server';

import { auth } from '@/auth';
import {
  type DefaultRequestQuery,
  type DefaultResponseBody,
  type EndpointConfig,
  withParams,
} from '@resala/shared';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

export const Endpoint = axios.create({
  baseURL: process.env.API_HOST,
});

Endpoint.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      console.log('Unauthorized');
    }
    return Promise.reject(error);
  }
);

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object';
};

type Req =
  | {
      params?: Record<string, string | number>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body?: { [key: string]: any };
      query?: DefaultRequestQuery['query'] | { [key: string]: string | number };
    }
  | undefined;
type Res = DefaultResponseBody;

export const callEndpoint = async <Request extends Req, Response extends Res>(
  endpoint: EndpointConfig,
  request?: Request
): Promise<Response> => {
  try {
    const params = isObject(request?.params) ? (Object.values(request.params) as string[]) : [];
    const { url, method, auth: isProtected } = withParams(endpoint, ...params);

    const config: AxiosRequestConfig = {
      url,
      method,
      data: request?.body,
      params: request?.query,
      headers: {
        Authorization: isProtected ? `Bearer ${(await auth())?.accessToken}` : undefined,
      },
    };

    return Endpoint<Request, Response>(config);
  } catch (e) {
    const error = e as AxiosError<Response>;
    let errorMsg = 'Something went wrong. Please try again later.';

    if (error.response) {
      errorMsg = error.response.data.message as string;
    } else if (error.request) {
      errorMsg = error.request.message || 'Request failed, please try again later.';
    } else {
      errorMsg = error.message;
    }

    return { success: false, message: errorMsg } as Response;
  }
};
