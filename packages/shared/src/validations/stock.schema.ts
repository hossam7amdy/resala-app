import { z } from 'zod';

import { ColorSchema } from './color.schema.js';
import { OffsetPageParamsSchema } from './common.schema.js';
import { ImageSchema } from './image.schema.js';
import { ProductSchema } from './product.schema.js';
import { SizeSchema } from './size.schema.js';

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

const UpdateStocksQuantitySchema = z.object({
  body: z.array(StockSchema.pick({ id: true, quantity: true })),
});

const DeleteStockSchema = z.object({
  params: z.object({
    stockId: z.string().cuid(),
  }),
});

const GetStockResponseSchema = StockSchema.extend({
  color: ColorSchema,
  size: SizeSchema,
  product: ProductSchema,
  image: ImageSchema.optional(),
  images: z.array(ImageSchema),
});

const ListStocksSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    search: z.string().max(100).optional(),
    productId: z.string().cuid().optional(),
  }),
});

const ListStocksResponseSchema = z.array(GetStockResponseSchema);

export {
  StockSchema,
  ListStocksSchema,
  CreateStockSchema,
  DeleteStockSchema,
  UpdateStocksQuantitySchema,
  GetStockResponseSchema,
  ListStocksResponseSchema,
};
