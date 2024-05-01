import { logout } from '@/actions/auth';
import {
  type DefaultRequestBody,
  type DefaultRequestQuery,
  type DefaultResponseBody,
  type EndpointConfig,
  withParams,
} from '@resala/shared';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import 'server-only';

import { getSession } from './session';

const Endpoint = axios.create({
  baseURL: process.env.API_HOST,
});

type Req =
  | {
      params?: Record<string, string | number>;
      body?: DefaultRequestBody;
      query?: DefaultRequestQuery['query'];
    }
  | undefined;
type Res = DefaultResponseBody;

export const callEndpoint = async <Request extends Req, Response extends Res>(
  endpoint: EndpointConfig,
  request?: Request
): Promise<Response> => {
  try {
    const params = request?.params ? (Object.values(request.params) as string[]) : [];
    const { url, method, auth: isProtected } = withParams(endpoint, ...params);

    const config: AxiosRequestConfig = {
      url,
      method,
      data: request?.body,
      params: request?.query,
      headers: {
        Authorization: isProtected ? `Bearer ${getSession()?.value}` : undefined,
      },
    };

    const response = await Endpoint<Request, AxiosResponse<Response>>(config);

    return response.data;
  } catch (e) {
    const error = e as AxiosError<DefaultResponseBody>;
    if (error.status === 401 || error.status === 403) {
      return logout();
    }
    throw new Error(error.response?.data?.message || 'Something went wrong.');
  }
};
