import { z } from 'zod';

const ImageSchema = z.object({
  id: z.string().cuid(),
  colorId: z.string().cuid(),
  productId: z.string().cuid(),
  isPrimary: z.boolean(),
  imageKey: z.string(),
  imageUrl: z.string(),
  createdAt: z.date().or(z.string().datetime()),
});

const ListImagesSchema = z.object({
  query: z.object({
    productId: z.string().cuid().optional(),
    colorId: z.string().cuid().optional(),
  }),
});

const CreateImageSchema = z.object({
  body: z.object({
    productId: z.string().cuid(),
    colorId: z.string().cuid(),
  }),
});

const UpdateImageSchema = z.object({
  params: z.object({
    imageId: z.string().cuid(),
  }),
  body: z.object({
    isPrimary: z.coerce.boolean().optional(),
  }),
});

const DeleteImageSchema = z.object({
  params: z.object({
    imageId: z.string().cuid(),
  }),
});

export { ImageSchema, ListImagesSchema, CreateImageSchema, DeleteImageSchema, UpdateImageSchema };
