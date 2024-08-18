'use server';

import { logout } from '@/actions/auth';
import { auth } from '@/auth';
import {
  type DefaultRequestQuery,
  type DefaultResponseBody,
  type EndpointConfig,
  withParams,
} from '@resala/shared';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_HOST,
});

apiClient.interceptors.response.use(
  response => response.data,
  async (error: AxiosError) => {
    if (error?.response?.status === 401) {
      await logout();
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

  try {
    return await apiClient<Request, Response>(config);
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
