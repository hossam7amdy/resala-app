import sharp from 'sharp';

const supported = (mimeType: string): boolean => {
  return mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/webp';
};

const optimize = async (image: ArrayBuffer): Promise<Buffer> => {
  // Convert ArrayBuffer to Buffer
  const buffer = Buffer.from(image);
  return await sharp(buffer).webp().toBuffer();
};

export const optimizeImages = async (images: File[]) => {
  const optimizedImages: File[] = [];

  for (const image of images) {
    const imageFile = image as File;
    const mimeType = imageFile.type;

    if (!supported(mimeType)) {
      throw new Error('Unsupported image type');
    }

    // Convert the image to ArrayBuffer
    const buffer = await imageFile.arrayBuffer();
    const optimizedImage = await optimize(buffer);

    // Create a new File with the optimized image
    const file = new File([optimizedImage], `${imageFile.name}-optimized.webp`, {
      type: 'image/webp',
    });
    optimizedImages.push(file);
  }

  return optimizedImages;
};
