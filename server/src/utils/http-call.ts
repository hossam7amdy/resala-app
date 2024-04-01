/**
 * Generic function to make HTTP calls
 *
 * @param params - URL, method, body and headers for the request
 * @returns Response from the API
 */
export async function httpCall<Request, Response>({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  method: string;
  body?: Request;
  headers?: Record<string, string>;
}): Promise<Response> {
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
}
