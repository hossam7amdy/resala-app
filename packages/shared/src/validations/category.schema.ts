import { z } from 'zod';

const CategorySchema = z.object({
  id: z.string().cuid(),
  arName: z.string().min(2).max(100),
  enName: z.string().min(2).max(100),
  mediaId: z.string().nullable().optional(),
  arDescription: z.string().min(2).max(1000).nullable().optional(),
  enDescription: z.string().min(2).max(1000).nullable().optional(),
  activateAt: z.date().or(z.string().datetime()).nullable().optional(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateCategorySchema = z.object({
  body: CategorySchema.pick({
    arName: true,
    enName: true,
    mediaId: true,
    enDescription: true,
    arDescription: true,
    activateAt: true,
  }),
});

const UpdateCategorySchema = z.object({
  params: CategorySchema.pick({ id: true }),
  body: CreateCategorySchema.shape.body.partial(),
});

const GetCategorySchema = z.object({
  params: UpdateCategorySchema.shape.params,
});

const DeleteCategorySchema = z.object({
  params: UpdateCategorySchema.shape.params,
});

export {
  CategorySchema,
  CreateCategorySchema,
  DeleteCategorySchema,
  GetCategorySchema,
  UpdateCategorySchema,
};
