import { z } from 'zod';

import { OffsetPageParamsSchema } from './common.schema.js';

const MediaSchema = z.object({
  id: z.string().cuid(),
  url: z.string().url(),
  filename: z.string(),
  size: z.coerce.number(),
  contentType: z.enum(['image', 'video']).default('image').optional(),
  duration: z.coerce.number().optional().nullable(),
  alt: z.string().optional().nullable(),
  mimetype: z.string().optional().nullable(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const SetMediaMetadataSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
  body: MediaSchema.omit({
    id: true,
    url: true,
    createdAt: true,
    updatedAt: true,
  }),
});

const ListMediaSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    search: z.string().optional(),
    sort: z.object({
      field: z.enum(['filename', 'createdAt', 'updatedAt']).default('createdAt'),
      order: z.enum(['asc', 'desc']).default('desc'),
    }),
  }),
});

export { MediaSchema, SetMediaMetadataSchema, ListMediaSchema };
