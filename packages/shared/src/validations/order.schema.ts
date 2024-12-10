import { Decimal } from 'decimal.js';
import { z } from 'zod';

import { OffsetPageParamsSchema } from './common.schema.js';

const OrderSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  subtotal: z.instanceof(Decimal).or(z.coerce.number()),
  discount: z.instanceof(Decimal).or(z.coerce.number()),
  total: z.instanceof(Decimal).or(z.coerce.number()),
  orderStatus: z.enum(['PENDING', 'FULFILLED', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  transactionId: z.string().optional().nullable(),
  paymentMethod: z.enum(['CARD', 'CASH']),
  paymentStatus: z.enum(['UNPAID', 'PAID', 'FAILED', 'VOIDED', 'REFUNDED']),
  note: z.string().optional().nullable(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateOrderSchema = z.object({
  body: z.object({
    paymentMethod: z.enum(['CARD', 'CASH']),
    note: z.string().max(500).optional(),
    addressId: z.string().cuid(),
  }),
});

const GetOrderSchema = z.object({
  params: z.object({
    orderId: z.string().cuid(),
  }),
});

const ListOrdersSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    userId: z.string().cuid().optional(),
    search: z.string().max(100).optional(),
  }),
});

const UpdateOrderStatusSchema = z.object({
  params: z.object({
    orderId: z.string().cuid(),
  }),
  body: z.object({
    orderStatus: z.enum(['PENDING', 'FULFILLED', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
    paymentStatus: z.enum(['UNPAID', 'PAID', 'FAILED', 'VOIDED', 'REFUNDED']),
  }),
});

const DeleteOrderSchema = z.object({
  params: GetOrderSchema.shape.params,
  query: z.object({
    userId: z.string().cuid(),
  }),
});

export {
  OrderSchema,
  CreateOrderSchema,
  DeleteOrderSchema,
  GetOrderSchema,
  ListOrdersSchema,
  UpdateOrderStatusSchema,
};
