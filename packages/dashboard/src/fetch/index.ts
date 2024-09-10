import { auth } from '@/auth';
import { type EndpointConfig, withParams, withQueryParams } from '@resala/shared';

const baseURL = process.env.API_HOST;

type Request<T> = Omit<RequestInit, 'body'> &
  T & {
    params?: Record<string, unknown>;
    query?: Record<string, unknown>;
    body?: Record<string, unknown> | RequestInit['body'];
  };
type Response<T> = T & { statusCode: number };

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object';
};

const isFormData = (value: unknown): value is FormData => {
  return value instanceof FormData;
};

export const callEndpoint = async <Req, Res>(
  endpoint: EndpointConfig,
  request?: Request<Req>
): Promise<Response<Res>> => {
  const { headers, params, query, body, ...requestInit } = request ?? {};

  const paramsArr = isObject(params) ? (Object.values(params) as string[]) : [];
  const withParamsConfig = withParams(endpoint, ...paramsArr);
  const { method, url } = withQueryParams(withParamsConfig, query ?? {});

  const response = await fetch(`${baseURL}${url}`, {
    method: method.toUpperCase(),
    headers: {
      ...(isFormData(body) ? {} : { 'Content-Type': 'application/json' }),
      Authorization: `Bearer ${(await auth())?.accessToken}`,
      ...headers,
    },
    body: isFormData(body) ? body : body ? JSON.stringify(body) : undefined,
    ...requestInit,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  return { ...(isJson ? await response.json() : {}), statusCode: response.status } as Response<Res>;
};
