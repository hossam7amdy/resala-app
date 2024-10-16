import { z } from 'zod';

import { OffsetPageParamsSchema } from './common.schema.js';

const discountTypes = ['PERCENTAGE', 'FIXED', 'BOGO', 'BULK'] as const;

const productIds = z.array(z.coerce.number().positive()).min(1).max(100);

const DiscountSchema = z.object({
  type: z.enum(discountTypes),
  amount: z.coerce.number().positive().min(0.1),
  description: z.string().max(250).optional(),
  minQty: z.coerce.number().positive().optional(),
  isActive: z.coerce.boolean().optional(),
  isStoreWide: z.coerce.boolean().optional(),
  productIds: productIds.optional(),
  startDate: z.coerce
    .date()
    .optional()
    .transform(val => val?.toISOString()),
  endDate: z.coerce
    .date()
    .optional()
    .transform(val => val?.toISOString()),
});

type Discount = z.infer<typeof DiscountSchema>;

const refineStoreWide = ({ productIds, isStoreWide }: Discount) => {
  if (isStoreWide) return !productIds;
  return true;
};
const refineStartAndEndDates = ({ startDate, endDate }: Discount) => {
  // if both startDate and endDate are provided, endDate must be greater than startDate
  if (startDate && endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return end >= start;
  }

  // if endDate is provided, startDate must be provided
  return endDate ? !!startDate : true;
};
const refineDiscountType = ({ type, amount, minQty }: Discount) => {
  if (type === 'BOGO') {
    return minQty && amount === Math.trunc(amount);
  }
  return true;
};

export const CreateDiscountSchema = z.object({
  body: DiscountSchema.refine(refineStoreWide)
    .refine(refineStartAndEndDates)
    .refine(refineDiscountType),
});

export const UpdateDiscountSchema = z.object({
  params: z.object({
    discountId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: DiscountSchema.omit({ productIds: true })
    .refine(refineDiscountType)
    .refine(refineStartAndEndDates),
});

export const DeleteDiscountSchema = z.object({
  params: UpdateDiscountSchema.shape.params,
});

export const AddProductsToDiscountSchema = z.object({
  params: z.object({
    discountId: z.coerce
      .number()
      .positive()
      .transform(discountId => discountId.toString()),
  }),
  body: z.object({ productIds }),
});

export const RemoveProductsFromDiscountSchema = z.object({
  params: AddProductsToDiscountSchema.shape.params,
  query: z.object({
    productIds: z
      .union([z.coerce.number(), productIds])
      .transform(productIds => (typeof productIds === 'number' ? [productIds] : productIds)),
  }),
});

export const ListDiscountsSchema = z.object({
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

export const GetDiscountSchema = z.object({
  params: z.object({
    discountId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  query: OffsetPageParamsSchema,
});
