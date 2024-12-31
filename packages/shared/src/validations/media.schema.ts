import { z } from 'zod';

const MediaSchema = z.object({
  id: z.string().cuid(),
  url: z.string().url(),
  filename: z.string(),
  size: z.coerce.number(),
  mimetype: z.string().optional().nullable(),
  updatedAt: z.date().or(z.string().datetime()),
});

const ListMediaSchema = z.object({
  query: z.object({
    search: z
      .string()
      .transform(s => s.trim() || undefined)
      .optional(),
  }),
});

export { MediaSchema, ListMediaSchema };
