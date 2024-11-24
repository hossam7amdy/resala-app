import { configuration } from '@/configuration/server';
import { ROUTES } from '@/routes';
import { type EndpointConfig, withParams, withQueryParams } from '@resala/shared';
import { redirect } from 'next/navigation';

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
  const { method, url, auth: isProtected } = withQueryParams(withParamsConfig, query ?? {});

  const session = { accessToken: undefined };
  const isLoggedIn = session !== null;

  const response = await fetch(`${configuration.baseUrl}${url}`, {
    method: method.toUpperCase(),
    headers: {
      ...(isProtected || isLoggedIn ? { Authorization: `Bearer ${session?.accessToken}` } : {}),
      ...(isFormData(body) ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: isFormData(body) ? body : body ? JSON.stringify(body) : undefined,
    ...requestInit,
  });

  if ([401, 403].includes(response.status) && method === 'get') {
    redirect(ROUTES.NOT_AUTHORIZED);
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  return { ...(isJson ? await response.json() : {}), statusCode: response.status } as Response<Res>;
};
