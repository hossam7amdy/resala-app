import { z } from 'zod';

const OffsetPageParamsSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).default('1'),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).default('100'),
});

export { OffsetPageParamsSchema };
