import { db } from '@/lib/db';
import { createHmac } from 'crypto';
import { type NextRequest, NextResponse } from 'next/server';

import type { PostPayRequestDTO } from './paymob.dto';

const status = (transaction: PostPayRequestDTO['transaction']) => {
  if (transaction.is_voided) return 'VOIDED';
  if (transaction.is_refunded) return 'REFUNDED';
  if (transaction.error_occured) return 'FAILED';
  if (transaction.success) return 'PAID';
  if (transaction.pending) return 'UNPAID';
};

const verify = (hmac: string, transaction: PostPayRequestDTO['transaction']): boolean => {
  const lexicographical =
    transaction.amount_cents +
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
    transaction.success;

  const hash = createHmac('sha512', process.env.PAYMOB_HMAC_KEY!)
    .update(lexicographical)
    .digest('hex');

  return hash === hmac;
};

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) => {
  try {
    const body = await request.json();
    const orderId = +(await params).orderId;
    const searchParams = request.nextUrl.searchParams;

    const transaction = body.transaction;
    const hmac = searchParams.get('hmac') || body.hmac;

    const isValid = verify(hmac, transaction);
    const paymentStatus = status(transaction);

    const { orderItems } = await db.order.update({
      data: {
        transactionId: transaction.id.toString(),
        paymentStatus,
      },
      where: { id: orderId },
      select: {
        orderItems: true,
      },
    });

    if (paymentStatus === 'PAID') {
      await db.$transaction(async trx => {
        const toUpdate = await trx.stock.findMany({
          where: {
            id: { in: orderItems.map(s => s.stockId) },
          },
        });

        for (const stock of toUpdate) {
          await trx.stock.update({
            where: { id: stock.id },
            data: {
              quantity: { decrement: stock.quantity },
            },
          });
        }
      });
    }

    if (!isValid) {
      throw new Error(`Invalid HMAC signature, hmac=${hmac}`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ status: `Webhook error: ${(e as Error).message}` }, { status: 400 });
  }
};
