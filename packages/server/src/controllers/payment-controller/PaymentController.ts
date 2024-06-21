import type { PaymentStatusType } from '@resala/shared';
import type { RequestHandler } from 'express';

import type { OrderService, PaymentService } from '../../services/index.js';
import type { CreatePayment, GetPayment, GetPaymentList } from './IPaymentController.js';
import type IPaymentController from './IPaymentController.js';

export default class PaymentController implements IPaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  createPayment: CreatePayment = async (req, res, next) => {
    try {
      const bodyObj = req.body['obj'];

      const status = await this.paymentService.createPayment(req.query.hmac, bodyObj);

      await this.orderService.updateOrder(Number(bodyObj.order.merchant_order_id), {
        paymentStatus: status as PaymentStatusType,
      });

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

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

      const { payments, pagination } = await this.paymentService.getPaymentsList({ page, limit });

      return res.json({
        success: true,
        data: { pagination, payments },
      });
    } catch (error) {
      next(error);
    }
  };

  paymentResponse: RequestHandler = async (req, res) => {
    try {
      const success = req.query.success === 'true';

      if (!success) {
        throw new Error('Payment failed');
      }

      return res.sendStatus(200);
    } catch (error) {
      const msg = (error as Error).message;
      return res.status(400).json({ message: msg });
    }
  };
}
