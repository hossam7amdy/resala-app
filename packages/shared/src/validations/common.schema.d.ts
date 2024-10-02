import { z } from 'zod';
export declare const OffsetPageParamsSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
