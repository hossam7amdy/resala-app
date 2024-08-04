import sharp from 'sharp';

import type { ImageOptimizer } from './ImageOptimizer';

export class SharpImageOptimizer implements ImageOptimizer {
  async scale(image: Buffer, maxWidth: number = 2000): Promise<Buffer> {
    return await sharp(image).resize({ width: maxWidth }).toBuffer();
  }

  async optimize(image: Buffer): Promise<Buffer> {
    return await sharp(image).webp().toBuffer();
  }

  supported(mimeType: string): boolean {
    return mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/webp';
  }
}
