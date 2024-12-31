interface CDNPort {
  /**
   * Generates a URL for a given resource.
   * @param resourcePath - The path of the resource.
   * @returns The full URL of the resource.
   */
  generateUrl(resourcePath: string): string;

  /**
   * Get a resource path from a URL.
   * @param url - The URL of the resource.
   * @returns The path of the resource.
   */
  getResourcePath(url: string): string;
}

export type { CDNPort };
