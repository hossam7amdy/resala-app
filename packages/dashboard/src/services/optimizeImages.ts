import { SharpImageOptimizer } from './ImageOptimizer/SharpImageOptimizer';

export const optimizeImages = async (images: File[]) => {
  const imageOptimizer = new SharpImageOptimizer();

  const optimizedImages: File[] = [];

  for (const image of images) {
    const imageFile = image as File;
    const mimeType = imageFile.type;

    if (!imageOptimizer.supported(mimeType)) {
      throw new Error('Unsupported image type');
    }

    const buffer = await imageFile.arrayBuffer();
    const optimizedImage = await imageOptimizer.optimize(buffer as Buffer);

    const file = new File([optimizedImage], 'optimized.webp', { type: 'image/webp' });
    optimizedImages.push(file);
  }

  return optimizedImages;
};
