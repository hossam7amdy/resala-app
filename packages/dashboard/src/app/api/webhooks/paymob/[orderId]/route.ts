import { configuration } from '@/configuration';
import { PaymobAdapter } from '@/infrastructure/payment-provider';
import { ROUTES } from '@/routes';
import { orderService, stockService } from '@/services';
import { createHmac } from 'crypto';
import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

export const POST = async (request: NextRequest, { params }: { params: { orderId: string } }) => {
  try {
    const orderId = params.orderId;

    const body = await request.json();
    const transaction = body.transaction;

    const searchParams = request.nextUrl.searchParams;
    const hmac = searchParams.get('hmac') || body.hmac;

    const verified = await verifyHmacSignature(hmac, transaction);

    // 1. update order status
    const paymob = new PaymobAdapter(configuration());
    const { status } = await paymob.retrieve(transaction.id);

    const { orderItems } = await orderService.update(orderId, {
      transactionId: transaction.id.toString(),
      paymentStatus: status!,
    });

    // 2. update stock quantity based on payment status
    if (status === 'PAID') {
      await stockService.decreaseQuantity(
        orderItems.map(item => ({ stockId: item.stockId, quantity: item.quantity }))
      );
    } else if (status === 'REFUNDED' || status === 'VOIDED') {
      await stockService.increaseQuantity(
        orderItems.map(item => ({ stockId: item.stockId, quantity: item.quantity }))
      );
    }

    // 3. revalidate cache
    revalidatePath(ROUTES.ORDERS);
    revalidatePath(ROUTES.STOCKS);

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifyHmacSignature = async (hmac: string, transaction: any) => {
  const lexicographical =
    transaction.amount_cents.toString() +
    transaction.created_at +
    transaction.currency +
    transaction.error_occured +
    transaction.has_parent_transaction +
    transaction.id +
    transaction.integration_id +
    transaction.is_3d_secure +
    transaction.is_auth +
    transaction.is_capture +
    transaction.is_refunded +
    transaction.is_standalone_payment +
    transaction.is_voided +
    transaction.order.id +
    transaction.owner +
    transaction.pending +
    transaction.source_data.pan +
    transaction.source_data.sub_type +
    transaction.source_data.type +
    transaction.success.toString();

  const hash = createHmac('sha512', process.env.PAYMOB_HMAC_KEY!)
    .update(lexicographical)
    .digest('hex');

  return hash.toLowerCase() === hmac.toLowerCase();
};
