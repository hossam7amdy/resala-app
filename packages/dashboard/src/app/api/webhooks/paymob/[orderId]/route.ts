import { ROUTES } from '@/routes';
import { orderService, paymobService, stockService } from '@/services';
import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

export const POST = async (request: NextRequest, { params }: { params: { orderId: string } }) => {
  try {
    const body = await request.json();
    const orderId = params.orderId;
    const searchParams = request.nextUrl.searchParams;
    const hmac = searchParams.get('hmac') || body.hmac;

    const transaction = body.transaction;

    const { verified, status } = await paymobService.handleWebhookCallback({ hmac, transaction });

    // 1. update order status
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
