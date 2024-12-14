import { z } from 'zod';

import { OffsetPageParamsSchema } from './common.schema.js';

const MediaSchema = z.object({
  id: z.string().cuid(),
  url: z.string().url(),
  filename: z.string(),
  size: z.coerce.number(),
  contentType: z.enum(['image', 'video']).default('image'),
  duration: z.coerce.number().optional(),
  alt: z.string().optional(),
  mimetype: z.string().optional(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateMediaSchema = z.object({
  body: MediaSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
});

const UpdateMediaSchema = z.object({
  params: z.object({
    mediaId: z.string().cuid(),
  }),
  body: CreateMediaSchema.shape.body.partial(),
});

const DeleteMediaSchema = z.object({
  params: z.object({
    mediaId: z.string().cuid(),
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

export { MediaSchema, CreateMediaSchema, UpdateMediaSchema, DeleteMediaSchema, ListMediaSchema };
