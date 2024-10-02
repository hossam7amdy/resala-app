import { z } from 'zod';

import { OffsetPageParamsSchema } from './common.schema.js';

const discountTypes = ['PERCENTAGE', 'FIXED', 'BOGO', 'BULK'] as const;

export const CreateDiscountSchema = z.object({
  body: z
    .object({
      type: z.enum(discountTypes),
      amount: z.coerce.number().positive().min(0.1),
      description: z.string().max(250).optional(),
      minQty: z.coerce.number().positive().optional(),
      isActive: z.coerce.boolean().optional(),
      isStoreWide: z.coerce.boolean().optional(),
      startDate: z.coerce
        .date()
        .optional()
        .transform(val => val?.toISOString()),
      endDate: z.coerce
        .date()
        .optional()
        .transform(val => val?.toISOString()),
      productIds: z.array(z.coerce.number().positive()).min(1).max(50).optional(),
    })
    .refine(
      ({ type, productIds }) => {
        if (['FIXED', 'BULK'].includes(type)) {
          return productIds === undefined;
        }
        return true;
      },
      {
        message: 'You cannot provide products for order-level discounts. (e.g. FIXED, BULK)',
        path: ['productIds'],
      }
    )
    .refine(
      ({ isStoreWide, productIds }) => {
        return isStoreWide ? !productIds : !!productIds;
      },
      {
        message: 'Please choose either store-wide or select specific products, but not both.',
        path: ['productIds'],
      }
    )
    .refine(
      ({ startDate, endDate }) => {
        // if both startDate and endDate are provided, endDate must be greater than startDate
        if (startDate && endDate) {
          const start = new Date(startDate).getTime();
          const end = new Date(endDate).getTime();

          return end >= start;
        }

        // if endDate is provided, startDate must be provided
        return endDate ? !!startDate : true;
      },
      {
        message:
          'Start date must not be in the past and end date must be greater than the start date.',
        path: ['startDate'],
      }
    )
    .refine(
      data => {
        if (data.type === 'BULK') return data.minQty;
        return true;
      },
      {
        message: 'Minimum quantity is required for BULK discount type.',
        path: ['minQty'],
      }
    )
    .refine(
      data => {
        if (data.type === 'BOGO') {
          return data.minQty && data.amount === Math.trunc(data.amount);
        }
        return true;
      },
      {
        message: 'Amount must be an integer for BOGO discount type.',
        path: ['amount'],
      }
    ),
});

export const UpdateDiscountSchema = z.object({
  params: z.object({
    discountId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateDiscountSchema.shape.body,
});

export const DeleteDiscountSchema = z.object({
  params: UpdateDiscountSchema.shape.params,
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
