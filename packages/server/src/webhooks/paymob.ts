import { createHmac } from 'crypto';
import type { RequestHandler } from 'express';

import { db } from '../datastore/index.js';
import type { PostPayRequestDTO } from './paymob.dto.js';

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

  console.log('transaction', transaction);
  console.log('verify', { hmac, hash });

  return hash === hmac;
};

export const postPay: RequestHandler<{ orderId: string }, unknown, PostPayRequestDTO> = async (
  req,
  res
) => {
  try {
    const orderId = +req.params.orderId;
    const transaction = req.body.transaction;
    const hmac = (req.query.hmac as string) || req.body.hmac;

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

    return res.status(200).send('Received');
  } catch (e) {
    return res.status(400).send(`Webhook error: ${(e as Error).message}`);
  }
};
