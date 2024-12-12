import { z } from 'zod';

const SizeSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateSizeSchema = z.object({
  body: SizeSchema.pick({
    name: true,
  }),
});

const UpdateSizeSchema = z.object({
  params: SizeSchema.pick({ id: true }),
  body: CreateSizeSchema.shape.body.partial(),
});

const DeleteSizeSchema = UpdateSizeSchema.pick({ params: true });

export { SizeSchema, CreateSizeSchema, UpdateSizeSchema, DeleteSizeSchema };
