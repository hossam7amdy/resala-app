'use server';

import { auth } from '@/auth';
import { getCookie } from '@/utils/cookies';
import { type DefaultResponseBody, type EndpointConfig, withParams } from '@resala/shared';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_HOST,
});

apiClient.interceptors.response.use(
  response => response.data,
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object';
};

type Req = {
  params?: Record<string, string | number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: any;
};
type Res = DefaultResponseBody;

export const callEndpoint = async <Request extends Req, Response extends Res>(
  endpoint: EndpointConfig,
  request?: Request
): Promise<Response> => {
  const params = isObject(request?.params) ? (Object.values(request.params) as string[]) : [];
  const { url, method, auth: isProtected } = withParams(endpoint, ...params);

  const accessToken = (await auth())?.accessToken || (await getCookie('jwt-token'))?.value;

  const config: AxiosRequestConfig = {
    url,
    method,
    data: request?.body,
    params: request?.query,
    headers: {
      Authorization: isProtected ? `Bearer ${accessToken}` : undefined,
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
