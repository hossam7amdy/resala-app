import { postOrderHandler } from '@/features';
import type { NextRequest } from 'next/server';

export const POST = async (
  request: NextRequest,
  props: { params: Promise<{ orderId: string }> }
) => {
  const params = await props.params;
  try {
    const orderId = params.orderId;

    const body = await request.json();
    const transaction = body.transaction;

    const searchParams = request.nextUrl.searchParams;
    const hmac = searchParams.get('hmac') || body.hmac;

    const verified = await postOrderHandler(orderId, hmac, transaction);

    if (!verified) {
      throw new Error(`Invalid HMAC signature, hmac=${hmac}`);
    }

    return new Response('Success!', {
      status: 200,
    });
  } catch (e) {
    return new Response(`Webhook error: ${(e as Error)?.message}`, {
      status: 400,
    });
  }
};
