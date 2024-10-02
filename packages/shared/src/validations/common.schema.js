import { z } from 'zod';
export const OffsetPageParamsSchema = z.object({
    page: z.coerce.number().positive().default(1).optional(),
    limit: z.coerce.number().positive().max(100).default(10).optional(),
});
