import type { OrderService } from '../order/order.service.js';
import type {
  GetPayment,
  PostPayCallback,
  RefundPayment,
  VoidPayment,
} from './payment.controller.interface.js';
import type { IPaymentController } from './payment.controller.interface.js';
import type { PaymentService } from './payment.service.js';

export class PaymentController implements IPaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  getPayment: GetPayment = async (req, res, next) => {
    try {
      const payment = await this.paymentService.retrieve(req.params.transactionId);

      return res.json({ success: true, data: payment });
    } catch (error) {
      next(error);
    }
  };

  voidPayment: VoidPayment = async (req, res, next) => {
    try {
      const transactionId = req.body.transactionId;

      await this.paymentService.void(transactionId);

      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  refundPayment: RefundPayment = async (req, res, next) => {
    try {
      const { transactionId, amount } = req.body;

      await this.paymentService.refund(transactionId, amount);

      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  postPayCallback: PostPayCallback = async (req, res, next) => {
    try {
      const orderId = parseInt(req.params.orderId || '');

      if (!orderId) {
        return res.sendStatus(400);
      }

      const status = await this.paymentService.postPayCallback(orderId, req.body);

      await this.orderService.update(+orderId, {
        paymentStatus: status as any,
        orderStatus: undefined as any,
      });

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
