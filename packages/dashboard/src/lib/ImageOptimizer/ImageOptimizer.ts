export interface ImageOptimizer {
  /**
   * Scale an image to a maximum width
   * @param image  The image to scale
   * @param maxWidth The maximum width of the image (default: 2000)
   * @returns The scaled image
   */
  scale(image: Buffer, maxWidth: number): Promise<Buffer>;

  /**
   * Optimize an image
   * @param image The image to optimize
   * @returns The optimized image
   */
  optimize(image: Buffer): Promise<Buffer>;

  /**
   * Check if the image type is supported
   * @param mimeType The mime type of the image
   * @returns Whether the image type is supported
   */
  supported(mimeType: string): boolean;
}
