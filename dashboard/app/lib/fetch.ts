'use server';

import { auth } from '@/auth';
import type {
  DefaultRequestBody,
  DefaultRequestQuery,
  DefaultResponseBody,
  EndpointConfig,
} from '@resala/shared';
import { AxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from './axios';

type Res = DefaultResponseBody;
type Req = {
  body?: DefaultRequestBody;
  query?: DefaultRequestQuery['query'];
};

export const callEndpoint = async <Request extends Req, Response extends Res>(
  endpoint: EndpointConfig,
  request?: Request
): Promise<Response> => {
  try {
    const { url, method, auth: isProtected } = endpoint;

    const session = await auth();

    const config: AxiosRequestConfig = {
      url,
      method,
      data: request?.body,
      params: request?.query,
      headers: {
        Authorization: isProtected ? `Bearer ${session?.user?.accessToken}` : undefined,
      },
    };

    const response = await axios<Request, AxiosResponse<Response>>(config);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error?.response?.data;
    }
    throw new Error('Something went wrong.');
  }
};
