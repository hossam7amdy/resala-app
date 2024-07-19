import { PaymentStatus } from '@resala/shared';

import type { OrderService, PaymentService } from '../../services/index.js';
import type { GetPayment, GetPaymentList, TransactionCallback } from './IPaymentController.js';
import type IPaymentController from './IPaymentController.js';

export default class PaymentController implements IPaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  getPayment: GetPayment = async (req, res, next) => {
    try {
      const payment = await this.paymentService.getPayment(req.params.paymentId);

      return res.json({ success: true, data: payment });
    } catch (error) {
      next(error);
    }
  };

  getPaymentList: GetPaymentList = async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      const { payments, pagination } = await this.paymentService.listPayments({ page, limit });

      return res.json({
        success: true,
        data: { pagination, payments },
      });
    } catch (error) {
      next(error);
    }
  };

  transactionProcessedCb: TransactionCallback = async (req, res, next) => {
    try {
      req.body.obj.order.merchant_order_id = req.params.orderId;

      await this.paymentService.createPayment(req.query.hmac as string, req.body);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  transactionResponseCb: TransactionCallback = async (req, res) => {
    const orderId = req.params.orderId;

    const status = () => {
      if (req.query.success === 'true') {
        return PaymentStatus.PAID;
      }

      if (req.query.error_occured === 'true') {
        return PaymentStatus.FAILED;
      }

      return PaymentStatus.UNPAID;
    };

    await this.orderService.updateOrder(+orderId, {
      paymentStatus: status(),
    });

    return res.redirect(process.env.FRONTEND_URL as string);
  };
}
