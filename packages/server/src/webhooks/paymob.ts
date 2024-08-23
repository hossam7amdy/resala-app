import { createHmac } from 'crypto';
import { RequestHandler } from 'express';

import { db } from '../datastore/index.js';
import { PostProcessedBodyDTO, PostRedirectQueryDTO } from './paymob.dto.js';

const status = (transaction: PostProcessedBodyDTO['transaction']) => {
  if (transaction.is_voided) return 'VOIDED';
  if (transaction.is_refunded) return 'REFUNDED';
  if (transaction.error_occured) return 'FAILED';
  if (transaction.success) return 'PAID';
  if (transaction.pending) return 'UNPAID';
};

const updateDatabase = async (
  orderId: number,
  transaction: PostProcessedBodyDTO['transaction']
) => {
  const response = await Promise.allSettled([
    db.payment.update({
      where: {
        orderId,
      },
      data: {
        transactionId: transaction.id,
        transactionOrderId: transaction.order.id,
      },
    }),
    db.order.update({
      data: {
        paymentStatus: status(transaction),
      },
      where: { id: orderId },
    }),
  ]);

  console.log('updateDatabase', response);
};

const verify = (hmac: string, lexString: string): boolean => {
  const hash = createHmac('sha512', process.env.PAYMOB_HMAC_KEY!).update(lexString).digest('hex');

  return hash === hmac;
};

export const postProcess: RequestHandler<
  { orderId: string },
  unknown,
  PostProcessedBodyDTO
> = async (req, res) => {
  try {
    const orderId = +req.params.orderId;
    const { hmac, transaction } = req.body;

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

    const isValid = verify(hmac, lexicographical);

    console.log('req.body', req.body);
    console.log('isValid', isValid);

    await updateDatabase(orderId, transaction);

    if (!isValid) {
      throw new Error('Invalid HMAC');
    }

    return res.status(200).send('Received');
  } catch (e) {
    return res.status(400).send(`Webhook error: ${(e as Error).message}`);
  }
};

export const postRedirect: RequestHandler<
  { orderId: string },
  unknown,
  unknown,
  PostRedirectQueryDTO
> = async (req, res) => {
  try {
    const orderId = +req.params.orderId;
    const transaction = req.query;
    const hmac = req.query.hmac;

    const lexicographical =
      req.query.amount_cents +
      req.query.created_at +
      req.query.currency +
      req.query.error_occured +
      req.query.has_parent_transaction +
      req.query.id +
      req.query.integration_id +
      req.query.is_3d_secure +
      req.query.is_auth +
      req.query.is_capture +
      req.query.is_refunded +
      req.query.is_standalone_payment +
      req.query.is_voided +
      req.query.order +
      req.query.owner +
      req.query.pending +
      req.query.source_data_pan +
      req.query.source_data_sub_type +
      req.query.source_data_type +
      req.query.success;

    const isValid = verify(hmac, lexicographical);

    await updateDatabase(orderId, transaction as unknown as PostProcessedBodyDTO['transaction']);

    if (!isValid) {
      throw new Error('Invalid HMAC');
    }

    const success = transaction.success && !transaction.error_occured;
    return res.redirect(`${process.env.WEB_APP_URL}/?orderId=${orderId}&success=${success}`);
  } catch (e) {
    return res.redirect(`${process.env.WEB_APP_URL}/?success=false&reason=${(e as Error).message}`);
  }
};
