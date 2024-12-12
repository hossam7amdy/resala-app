import { z } from 'zod';

const CategorySchema = z.object({
  id: z.string().cuid(),
  arName: z.string().min(2).max(100),
  enName: z.string().min(2).max(100),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateCategorySchema = z.object({
  body: CategorySchema.pick({
    arName: true,
    enName: true,
  }),
});

const UpdateCategorySchema = z.object({
  params: CategorySchema.pick({ id: true }),
  body: CreateCategorySchema.shape.body,
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
