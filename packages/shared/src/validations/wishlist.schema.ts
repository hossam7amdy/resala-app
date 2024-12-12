import { z } from 'zod';

const WishlistSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateWishlistSchema = z.object({
  body: WishlistSchema.pick({
    productId: true,
  }),
});

const DeleteWishlistSchema = z.object({
  params: WishlistSchema.pick({
    productId: true,
  }),
});

export { WishlistSchema, CreateWishlistSchema, DeleteWishlistSchema };
