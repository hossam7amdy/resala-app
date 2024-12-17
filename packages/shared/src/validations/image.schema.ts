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
  query: ImageSchema.pick({ colorId: true, productId: true }),
});

const CreateImageSchema = z.object({
  body: ImageSchema.pick({
    colorId: true,
    productId: true,
    imageKey: true,
    imageUrl: true,
    isPrimary: true,
  }),
});

const UpdateImageSchema = z.object({
  params: ImageSchema.pick({ id: true }),
  body: CreateImageSchema.shape.body.partial(),
});

const DeleteImageSchema = z.object({
  params: ImageSchema.pick({ id: true }),
});

export { ImageSchema, ListImagesSchema, CreateImageSchema, DeleteImageSchema, UpdateImageSchema };
