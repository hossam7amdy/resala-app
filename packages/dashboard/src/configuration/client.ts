import { z } from 'zod';

const configuration = () => ({
  baseUrl: z.string().url().parse(process.env.NEXT_PUBLIC_BASE_URL),
});

type Configuration = ReturnType<typeof configuration>;
export { configuration, type Configuration };
