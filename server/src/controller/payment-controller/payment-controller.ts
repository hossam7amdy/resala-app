import { RequestHandler } from 'express';

import { orderService, paymentService } from '../../service';
import { BadRequestError } from '../../utils/api-errors';

export const transactionCallbackHandler: RequestHandler = async (req, res) => {
  const hmac = String(req.query.hmac);

  try {
    if (!hmac) {
      throw new BadRequestError('HMAC is required');
    }

    const status = await paymentService.createPayment(hmac, req.body['obj']);

    await orderService.updateOrder(req.body.order.merchant.id, {
      paymentStatus: status,
    });

    return res.sendStatus(200);
  } catch (error) {}
};
