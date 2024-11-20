import { listAllCategories } from '@/fetch/categoryy';

export const GET = async () => {
  const categories = await listAllCategories();
  return Response.json({ data: categories });
};
