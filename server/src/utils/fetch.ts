/**
 *  This function is used to make HTTP calls to the server.
 *
 * @param param0  url: string; method: string; body?: Request; headers?: Record<string, string>;
 * @returns Response data
 */
const httpCall = async <Request, Response>({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  method: string;
  body?: Request;
  headers?: Record<string, string>;
}): Promise<Response> => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      if (isJson) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const responseData = (await response.json()) as any;
        errorMessage = responseData.error || errorMessage;
      } else {
        const responseData = await response.text();
        errorMessage = responseData || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return isJson ? ((await response.json()) as Response) : ((await response.text()) as Response);
  } catch (error) {
    console.error('Failed to call API', error);
    throw new Error('Failed to call API');
  }
};

/**
 * Fetch utility to make HTTP requests.
 */
class Fetch {
  static get<Response>(url: string, headers?: Record<string, string>): Promise<Response> {
    return httpCall({ url, method: 'GET', headers });
  }

  static post<Request, Response>(
    url: string,
    body: Request,
    headers?: Record<string, string>
  ): Promise<Response> {
    return httpCall({ url, method: 'POST', body, headers });
  }

  static put<Request, Response>(
    url: string,
    body: Request,
    headers?: Record<string, string>
  ): Promise<Response> {
    return httpCall({ url, method: 'PUT', body, headers });
  }

  static delete<Response>(url: string, headers?: Record<string, string>): Promise<Response> {
    return httpCall({ url, method: 'DELETE', headers });
  }
}

export default Fetch;
