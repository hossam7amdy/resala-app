import { z } from 'zod';

const GetPaymentSchema = z.object({
  params: z.object({
    transactionId: z.string(),
  }),
});

const VoidPaymentSchema = z.object({
  body: z.object({
    transactionId: z.string(),
  }),
});

const RefundPaymentSchema = z.object({
  body: z.object({
    transactionId: z.string(),
    amount: z.coerce.number().positive(),
  }),
});

export { GetPaymentSchema, VoidPaymentSchema, RefundPaymentSchema };
