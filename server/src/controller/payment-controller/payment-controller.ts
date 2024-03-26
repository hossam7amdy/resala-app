import { RequestHandler } from 'express';

import { orderService, paymentService } from '../../service';
import { BadRequestError } from '../../utils/api-errors';

export const createPayment: RequestHandler = async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
};

export const getPayment: RequestHandler = async (req, res, next) => {
  const paymentId = Number(req.params.paymentId);

  try {
    if (isNaN(paymentId)) {
      throw new BadRequestError('Invalid payment id');
    }

    const payment = await paymentService.getPayment(paymentId);

    return res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentList: RequestHandler = async (req, res, next) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  try {
    const payments = await paymentService.getPaymentsList({
      limit,
      page,
      query: '',
    });

    return res.json({
      success: true,
      data: {
        pagination: {
          limit,
          page,
        },
        payments,
      },
    });
  } catch (error) {
    next(error);
  }
};
