import { z } from 'zod';

import { OffsetPageParamsSchema } from './common.schema.js';

const StockSchema = z.object({
  id: z.string().cuid(),
  productId: z.string().cuid(),
  colorId: z.string().cuid(),
  sizeId: z.string().cuid(),
  quantity: z.number().int().positive(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateStockSchema = z.object({
  body: z.object({
    productId: z.string().cuid(),
    colorId: z.string().cuid(),
    sizeId: z.string().cuid(),
    quantity: z.coerce.number().nonnegative(),
  }),
});

const UpdateStockSchema = z.object({
  params: z.object({
    stockId: z.string().cuid(),
  }),
  body: CreateStockSchema.shape.body,
});

const DeleteStockSchema = z.object({
  params: z.object({
    stockId: z.string().cuid(),
  }),
});

const ListStocksSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    search: z.string().max(100).optional(),
    productId: z.string().cuid().optional(),
  }),
});

export { StockSchema, CreateStockSchema, DeleteStockSchema, UpdateStockSchema, ListStocksSchema };
