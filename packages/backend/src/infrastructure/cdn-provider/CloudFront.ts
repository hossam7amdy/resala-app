import type { CDNPort } from '@/interfaces';

class CloudFrontAdapter implements CDNPort {
  constructor(private readonly init: { baseUrl: string }) {}

  generateUrl(resourcePath: string): string {
    return `${this.init.baseUrl}/${resourcePath}`;
  }

  getResourcePath(url: string): string {
    return url.replace(`${this.init.baseUrl}/`, '');
  }
}

export { CloudFrontAdapter };
