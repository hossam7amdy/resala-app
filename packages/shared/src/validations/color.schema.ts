import { z } from 'zod';

const ColorSchema = z.object({
  id: z.string().cuid(),
  code: z.string(),
  arName: z.string(),
  enName: z.string(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateColorSchema = z.object({
  body: ColorSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
});

const UpdateColorSchema = z.object({
  params: z.object({
    id: ColorSchema.shape.id,
  }),
  body: CreateColorSchema.shape.body.partial(),
});

export const DeleteColorSchema = z.object({
  params: UpdateColorSchema.shape.params,
});

export { ColorSchema, CreateColorSchema, UpdateColorSchema };
