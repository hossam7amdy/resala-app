import { z } from 'zod';

const ImageSchema = z.object({
  mediaId: z.string(),
  colorId: z.string().cuid(),
  productId: z.string().cuid(),
  isPrimary: z.boolean(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const ListImagesSchema = z.object({
  query: ImageSchema.pick({ colorId: true, productId: true }),
});

const CreateImageSchema = z.object({
  body: ImageSchema.pick({
    colorId: true,
    productId: true,
    mediaId: true,
    isPrimary: true,
  }),
});

export { ImageSchema, ListImagesSchema, CreateImageSchema };
