import { logger } from '../../lib/logger.js';
import type { OrderService, PaymentService } from '../../services/index.js';
import type {
  GetPayment,
  GetPaymentList,
  TransactionProcessedCallback,
  TransactionResponseCallback,
} from './IPaymentController.js';
import type IPaymentController from './IPaymentController.js';

export default class PaymentController implements IPaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  getPayment: GetPayment = async (req, res, next) => {
    try {
      const payment = await this.paymentService.findPayment(req.params.paymentId);

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

  transactionResponseCallback: TransactionResponseCallback = async (req, res) => {
    try {
      const orderId = +req.params.orderId;
      const hmac = req.query.hmac as string;

      const status = await this.paymentService.handleResponseCb(orderId, hmac, req.query);

      await this.orderService.updateOrder(+orderId, {
        paymentStatus: status,
      });
    } finally {
      res.redirect(process.env.FRONTEND_URL as string);
    }
  };

  transactionProcessedCallback: TransactionProcessedCallback = async (req, res, next) => {
    try {
      const hmac = req.query.hmac;

      logger.info('Processed Callback', req.body);

      const payment = await this.paymentService.findPaymentByTransactionRef(+req.body.obj.id);
      const status = await this.paymentService.handleProcessedCb(payment.orderId, hmac, req.body);

      await this.orderService.updateOrder(payment.orderId, {
        paymentStatus: status,
      });

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
