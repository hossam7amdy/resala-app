import { findProduct } from '@/services/products';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const GET = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const productId = (await params).id;

  const product = await findProduct(productId);
  if (product) {
    return NextResponse.json({ data: product });
  }

  return NextResponse.json(
    {
      success: false,
      message: 'Product not found',
    },
    { status: 404 }
  );
};
