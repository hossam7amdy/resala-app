import { httpCall } from './http-call';

export const fetch = {
  get<Response>(url: string, headers?: Record<string, string>): Promise<Response> {
    return httpCall({ url, method: 'GET', headers });
  },

  post<Request, Response>(
    url: string,
    body: Request,
    headers?: Record<string, string>
  ): Promise<Response> {
    return httpCall({ url, method: 'POST', body, headers });
  },

  put<Request, Response>(
    url: string,
    body: Request,
    headers?: Record<string, string>
  ): Promise<Response> {
    return httpCall({ url, method: 'PUT', body, headers });
  },

  delete<Response>(url: string, headers?: Record<string, string>): Promise<Response> {
    return httpCall({ url, method: 'DELETE', headers });
  },
};
