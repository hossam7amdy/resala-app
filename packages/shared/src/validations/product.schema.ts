import { Decimal } from 'decimal.js';
import { z } from 'zod';

import { CategorySchema } from './category.schema.js';
import { ColorSchema } from './color.schema.js';
import { OffsetPageParamsSchema } from './common.schema.js';
import { DiscountSchema } from './discount.schema.js';
import { CreateImageSchema, ImageSchema } from './image.schema.js';
import { CreateStockSchema, StockSchema } from './stock.schema.js';

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
    imageKey: true,
    imageUrl: true,
  }).extend({
    images: z.array(CreateImageSchema.shape.body.omit({ productId: true })).min(1),
    stocks: z.array(CreateStockSchema.shape.body.omit({ productId: true })).min(1),
  }),
});

const UpdateProductSchema = z.object({
  params: ProductSchema.pick({ id: true }),
  body: CreateProductSchema.shape.body.partial(),
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

const GetProductResponseSchema = ProductSchema.extend({
  avgRating: z.number(),
  category: CategorySchema,
  discounts: z.array(DiscountSchema),
  stocks: z.array(
    z.object({
      color: ColorSchema,
      images: z.array(ImageSchema.omit({ colorId: true, productId: true })),
      sizes: z.array(
        StockSchema.omit({ id: true, colorId: true, productId: true }).extend({
          stockId: z.string().cuid(),
          size: z.string(),
        })
      ),
    })
  ),
});

const ListProductsResponseSchema = z.array(GetProductResponseSchema);

export {
  ProductSchema,
  CreateProductSchema,
  DeleteProductSchema,
  GetProductSchema,
  ListProductsSchema,
  UpdateProductSchema,
  GetProductResponseSchema,
  ListProductsResponseSchema,
};
