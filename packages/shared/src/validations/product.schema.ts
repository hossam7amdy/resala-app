import { Decimal } from 'decimal.js';
import { z } from 'zod';

import { OffsetPageParamsSchema } from './common.schema.js';

const ProductSchema = z.object({
  id: z.string().cuid(),
  categoryId: z.string().cuid(),
  arName: z.string().min(2).max(100),
  enName: z.string().min(2).max(100),
  arDescription: z.string().max(500),
  enDescription: z.string().max(500),
  price: z.instanceof(Decimal).or(z.coerce.number()),
  imageKey: z.string(),
  imageUrl: z.string(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateProductSchema = z.object({
  body: ProductSchema.pick({
    categoryId: true,
    arName: true,
    enName: true,
    arDescription: true,
    enDescription: true,
    price: true,
  }),
});

const UpdateProductSchema = z.object({
  params: ProductSchema.pick({ id: true }),
  body: CreateProductSchema.shape.body,
});

const GetProductSchema = z.object({
  params: UpdateProductSchema.shape.params,
});

const ListProductsSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    search: z.string().max(100).optional(),
    categoryId: z.string().cuid().optional(),
  }),
});

const DeleteProductSchema = z.object({
  params: UpdateProductSchema.shape.params,
});

export {
  ProductSchema,
  CreateProductSchema,
  DeleteProductSchema,
  GetProductSchema,
  ListProductsSchema,
  UpdateProductSchema,
};
