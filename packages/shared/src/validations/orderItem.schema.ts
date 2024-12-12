import { Decimal } from 'decimal.js';
import { z } from 'zod';

const OrderItemSchema = z.object({
  id: z.string().cuid(),
  orderId: z.string(),
  productId: z.string(),
  stockId: z.string(),
  quantity: z.number().int(),
  price: z.instanceof(Decimal).or(z.coerce.number()),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

export { OrderItemSchema };
