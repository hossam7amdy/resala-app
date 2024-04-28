import { logout } from '@/actions/auth';
import type {
  DefaultRequestBody,
  DefaultRequestQuery,
  DefaultResponseBody,
  EndpointConfig,
} from '@resala/shared';
import { AxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import 'server-only';

import axios from './axios';
import { getSession } from './session';

type Res = DefaultResponseBody;
type Req =
  | {
      body?: DefaultRequestBody;
      query?: DefaultRequestQuery['query'];
    }
  | undefined;

export const callEndpoint = async <Request extends Req, Response extends Res>(
  endpoint: EndpointConfig,
  request?: Request
): Promise<Response> => {
  try {
    const { url, method, auth: isProtected } = endpoint;

    const config: AxiosRequestConfig = {
      url,
      method,
      data: request?.body,
      params: request?.query,
      headers: {
        Authorization: isProtected ? `Bearer ${getSession()?.value}` : undefined,
      },
    };

    const response = await axios<Request, AxiosResponse<Response>>(config);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        logout();
      }
      throw error?.response?.data;
    }
    console.error(error);
    throw new Error('Something went wrong.');
  }
};
