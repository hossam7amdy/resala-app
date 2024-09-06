import { auth } from '@/auth';
import { httpClient } from '@/lib/http-client';
import { type DefaultResponseBody, type EndpointConfig, withParams } from '@resala/shared';
import type { AxiosRequestConfig } from 'axios';

export class ApiError extends Error {
  public status: number;

  constructor(status: number, msg: string) {
    super(msg);
    this.status = status;
  }
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object';
};

type Req =
  | {
      params?: Record<string, string | number>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body?: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query?: any;
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

  return httpClient<Request, Response>(config);
};
