import { Decimal } from 'decimal.js';
import { z } from 'zod';

import { OffsetPageParamsSchema } from './common.schema.js';

const discountTypes = ['PERCENTAGE', 'FIXED', 'BOGO', 'BULK'] as const;

const productIds = z.array(z.string().cuid()).min(1).max(100).optional();

const DiscountSchema = z.object({
  id: z.string().cuid(),
  type: z.enum(['PERCENTAGE', 'FIXED', 'BOGO', 'BULK']),
  amount: z.instanceof(Decimal).or(z.coerce.number()),
  description: z.string().max(250).optional().nullable(),
  minQty: z.number().int().min(1).default(1),
  isActive: z.boolean().default(true),
  isStoreWide: z.boolean().default(false),
  startDate: z.date().or(z.string().datetime()).optional().nullable(),
  endDate: z.date().or(z.string().datetime()).optional().nullable(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateDiscountSchema = z.object({
  body: DiscountSchema.pick({
    type: true,
    amount: true,
    description: true,
    minQty: true,
    isActive: true,
    isStoreWide: true,
    startDate: true,
    endDate: true,
  }).extend({
    productIds,
  }),
});

const UpdateDiscountSchema = z.object({
  params: DiscountSchema.pick({ id: true }),
  body: DiscountSchema.partial(),
});

const DeleteDiscountSchema = z.object({
  params: DiscountSchema.pick({ id: true }),
});

const AddProductsToDiscountSchema = z.object({
  params: DiscountSchema.pick({ id: true }),
  body: z.object({ productIds }),
});

const RemoveProductsFromDiscountSchema = z.object({
  params: AddProductsToDiscountSchema.shape.params,
  query: z.object({ productIds }),
});

const ListDiscountsSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    type: z
      .enum([...discountTypes, ''])
      .optional()
      .transform(val => val || undefined),
    isActive: z
      .string()
      .optional()
      .transform(val => (val ? val === 'true' : undefined)),
    isStoreWide: z
      .string()
      .optional()
      .transform(val => (val ? val === 'true' : undefined)),
    startDate: z.coerce
      .string()
      .optional()
      .refine(date => {
        if (!date) return true;
        return z.string().date().safeParse(date).success;
      }),
    endDate: z.coerce
      .string()
      .optional()
      .refine(date => {
        if (!date) return true;
        return z.string().date().safeParse(date).success;
      }),
  }).refine(
    ({ startDate, endDate }) => {
      if (!startDate || !endDate) return true;
      return new Date(endDate).getTime() >= new Date(startDate).getTime();
    },
    {
      message: 'Start date must be greater than or equal to end date.',
    }
  ),
});

const GetDiscountSchema = z.object({
  params: DiscountSchema.pick({ id: true }),
  query: OffsetPageParamsSchema,
});

export {
  DiscountSchema,
  CreateDiscountSchema,
  UpdateDiscountSchema,
  DeleteDiscountSchema,
  AddProductsToDiscountSchema,
  RemoveProductsFromDiscountSchema,
  ListDiscountsSchema,
  GetDiscountSchema,
};
