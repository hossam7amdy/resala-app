import sharp from 'sharp';

const supported = (mimeType: string): boolean => {
  return mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/webp';
};

const optimize = async (image: Buffer): Promise<Buffer> => {
  return await sharp(image).webp().toBuffer();
};

export const optimizeImages = async (images: File[]) => {
  const optimizedImages: File[] = [];

  for (const image of images) {
    const imageFile = image as File;
    const mimeType = imageFile.type;

    if (!supported(mimeType)) {
      throw new Error('Unsupported image type');
    }

    const buffer = await imageFile.arrayBuffer();
    const optimizedImage = await optimize(buffer as Buffer);

    const file = new File([optimizedImage], 'optimized.webp', { type: 'image/webp' });
    optimizedImages.push(file);
  }

  return optimizedImages;
};
