export interface HttpClientInit {
  baseUrl?: string; // Optional base URL for all requests
  defaultHeaders?: Record<string, string>; // Default headers for all requests
}

export interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export class HttpClient {
  private baseUrl?: string;
  private defaultHeaders: Record<string, string>;

  constructor(init: HttpClientInit = {}) {
    this.baseUrl = init.baseUrl;
    this.defaultHeaders = init.defaultHeaders || {};
  }

  private mergeHeaders(headers?: Record<string, string>): Record<string, string> {
    return { ...this.defaultHeaders, ...headers };
  }

  private buildUrl(url: string): string {
    return this.baseUrl ? new URL(url, this.baseUrl).toString() : url;
  }

  public async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const fullUrl = this.buildUrl(url);
    const headers = this.mergeHeaders(options.headers);

    const response = await fetch(fullUrl, { ...options, headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, url: ${fullUrl}`);
    }

    return response.json() as Promise<T>;
  }

  public get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  public post<T>(url: string, body: unknown, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.mergeHeaders({
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      }),
    });
  }

  public put<T>(url: string, body: unknown, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
      headers: this.mergeHeaders({
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      }),
    });
  }

  public delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }
}
