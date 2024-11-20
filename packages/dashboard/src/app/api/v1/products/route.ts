import { listProducts } from '@/services/products';
import type { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '10';
  const search = searchParams.get('search') ?? '';

  const data = await listProducts({ search, page: +page, limit: +limit });
  return Response.json({ data });
};
