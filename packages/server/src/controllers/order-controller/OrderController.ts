import type { NotificationService, OrderService, PaymentService } from '../../services/index.js';
import type {
  CreateOrder,
  DeleteOrder,
  GetOrder,
  GetOrdersList,
  UpdateOrderStatus,
} from './IOrderController.js';
import type IOrderController from './IOrderController.js';

export default class OrderController implements IOrderController {
  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService,
    private notificationService: NotificationService
  ) {}

  createOrder: CreateOrder = async (req, res, next) => {
    try {
      const user = res.locals.user;
      const { addressId, paymentMethod, note } = req.body;

      const order = await this.orderService.createOrder(user.id, {
        addressId,
        paymentMethod,
        note,
      });

      let payment;
      if (paymentMethod === 'CARD') {
        // create payment
        payment = await this.paymentService.createPaymentRequest({
          orderId: order.id,
          email: user.email,
          amount: Number(order.total) * 100,
          shipping: order.address,
          items: order.items,
        });
      }

      return res.status(201).json({ success: true, data: payment });
    } catch (error) {
      next(error);
    }
  };

  getOrder: GetOrder = async (req, res, next) => {
    try {
      const user = res.locals.user;
      const orderId = req.params.orderId;

      const order = await this.orderService.findUserOrderById(orderId, user.id);

      return res.status(200).json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };

  getOrdersList: GetOrdersList = async (req, res, next) => {
    try {
      const user = res.locals.user;
      const { page, limit } = req.query;

      const { orders, pagination } = await this.orderService.getUserOrders(user.id, {
        page,
        limit,
      });

      return res.status(200).json({
        success: true,
        data: { pagination, orders },
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOrder: DeleteOrder = async (req, res, next) => {
    try {
      const user = res.locals.user;
      const orderId = req.params.orderId;

      // cancel order
      const order = await this.orderService.cancelUserOrder(orderId, user.id);

      // void payment
      if (order.paymentMethod === 'CARD') {
        await this.paymentService.voidPayment(order.id);
      }

      // notify user with order cancellation
      if (user.email) {
        await this.notificationService.sendOrderCancellationEmail(user.email, order.id);
      }

      return res.json({ success: true, message: 'Order canceled' });
    } catch (error) {
      next(error);
    }
  };

  adminGetOrder: GetOrder = async (req, res, next) => {
    try {
      const order = await this.orderService.findOrderById(req.params.orderId);

      return res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  };

  adminGetOrdersList: GetOrdersList = async (req, res, next) => {
    try {
      const { page, limit, query } = req.query;

      const { orders, pagination } = await this.orderService.listOrders({ page, limit, query });

      return res.json({
        success: true,
        data: { pagination, orders },
      });
    } catch (error) {
      next(error);
    }
  };

  adminDeleteOrder: DeleteOrder = async (req, res, next) => {
    try {
      // Cancel order
      const order = await this.orderService.adminCancelOrder(req.params.orderId);

      // Refund payment if paid by card
      if (order.paymentMethod === 'CARD' && order.paymentDetails) {
        await this.paymentService.refundPayment(order.paymentDetails.id);
      }

      // Notify user with order cancellation
      if (order.user?.email) {
        await this.notificationService.sendOrderCancellationEmail(order.user.email, order.id);
      }

      return res.json({ success: true, message: 'Order canceled' });
    } catch (error) {
      next(error);
    }
  };

  updateOrderStatus: UpdateOrderStatus = async (req, res, next) => {
    try {
      const { status } = req.body;
      const order = await this.orderService.updateOrderStatus(req.params.orderId, status);

      if (order.user?.email) {
        await this.notificationService.sendOrderCancellationEmail(order.user.email, order.id);
      }

      return res.json({ success: true, message: 'Order status updated' });
    } catch (error) {
      next(error);
    }
  };
}
