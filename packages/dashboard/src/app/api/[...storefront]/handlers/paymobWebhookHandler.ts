import { db } from '@/lib/db';
import { ROUTES } from '@/routes';
import type { PostPayRequestDTO } from '@/services/paymob';
import { createHmac } from 'crypto';
import type { Context } from 'hono';
import { revalidatePath } from 'next/cache';

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

export const paymobWebhookHandler = async (c: Context) => {
  try {
    const body = await c.req.json();
    const orderId = c.req.param('orderId') as string;
    const hmac = c.req.query('hmac') || body.hmac;

    const transaction = body.transaction;

    const isValid = verify(hmac, transaction);
    const paymentStatus = status(transaction);

    const { orderItems } = await db.order.update({
      data: {
        transactionId: transaction.id.toString(),
        paymentStatus,
      },
      where: { id: +orderId },
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

    revalidatePath(ROUTES.ORDERS);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, error });
  }
};
