import type { OrderService, PaymentService } from '../../services/index.js';
import type {
  GetPayment,
  PostPayCallback,
  RefundPayment,
  VoidPayment,
} from './IPaymentController.js';
import type IPaymentController from './IPaymentController.js';

export default class PaymentController implements IPaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  getPayment: GetPayment = async (req, res, next) => {
    try {
      const payment = await this.paymentService.retrieve(req.params.paymentId);

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
      const transactionId = req.body.transactionId;

      await this.paymentService.refund(transactionId);

      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  postPayCallback: PostPayCallback = async (req, res, next) => {
    try {
      const hmac = req.query.hmac;
      const orderId = parseInt(req.params.orderId || '');

      if (!orderId) {
        return res.sendStatus(400);
      }

      const status = await this.paymentService.postPayCallback(orderId, hmac, req.body);

      await this.orderService.updateOrder(+orderId, {
        paymentStatus: status,
      });

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
