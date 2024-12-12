import { z } from 'zod';

const CartSchema = z.object({
  userId: z.string(),
  stockId: z.string(),
  quantity: z.coerce.number().int().default(1),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateCartSchema = z.object({
  body: CartSchema.pick({
    stockId: true,
    quantity: true,
  }),
});

const UpdateCartSchema = CreateCartSchema.pick({ body: true });

const DeleteCartSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export { CartSchema, CreateCartSchema, UpdateCartSchema, DeleteCartSchema };
