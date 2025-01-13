import { z } from 'zod';

const TranslationSchema = z.object({
  langCode: z
    .string({ description: 'Language code' })
    .length(2)
    .refine(langCode => ['ar', 'en'].includes(langCode), {
      message: 'Invalid language code',
    }),
  text: z
    .string({
      description: 'Text to show in the announcement bar',
    })
    .max(200, {
      message: 'Text should not exceed 200 characters',
    }),
});

const AnnouncementItemSchema = z.object({
  order: z.number().int().min(0, {
    message: 'Order should be a positive integer',
  }),
  text: z
    .string({
      description: 'Text to show in the announcement bar',
    })
    .max(200, {
      message: 'Text should not exceed 200 characters',
    }),
  link: z
    .string()
    .max(200, {
      message: 'Link should not exceed 200 characters',
    })
    .nullable(),
  translations: TranslationSchema.array().min(1).max(2).default([]),
});

export const AnnouncementBarSchema = z.object({
  id: z.string().max(32, {
    message: 'Invalid announcement section ID',
  }),
  name: z.string().max(50, {
    message: 'Section name should not exceed 50 characters',
  }),
  isActive: z.boolean().default(true),
  items: AnnouncementItemSchema.array().min(1).max(100),
});
