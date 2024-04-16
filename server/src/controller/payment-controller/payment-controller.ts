import { orderService, paymentService } from '../../service';
import { CreatePayment, GetPayment, GetPaymentList } from './payment-controller.interface';

export const createPayment: CreatePayment = async (req, res, next) => {
  try {
    const bodyObj = req.body['obj'];

    const status = await paymentService.createPayment(req.query.hmac, bodyObj);

    await orderService.updateOrder(Number(bodyObj.order.merchant_order_id), {
      paymentStatus: status,
    });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const getPayment: GetPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.getPayment(req.params.paymentId);

    return res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentList: GetPaymentList = async (req, res, next) => {
  try {
    const { limit, page } = req.query;

    const { payments, total } = await paymentService.getPaymentsList({ page, limit });

    return res.json({
      success: true,
      data: {
        pagination: {
          limit,
          page,
          total,
        },
        payments,
      },
    });
  } catch (error) {
    next(error);
  }
};
