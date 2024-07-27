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

      const { address, items, ...order } = await this.orderService.createOrder(user.id, {
        addressId,
        paymentMethod,
        note,
      });

      let payment;
      if (paymentMethod === 'CARD') {
        payment = await this.paymentService.checkout({
          user: user,
          order: order,
          items: items,
          shipping: address,
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

  listOrders: GetOrdersList = async (req, res, next) => {
    try {
      const { orders, pagination } = await this.orderService.listOrders(req.query);

      return res.status(200).json({
        success: true,
        data: { pagination, orders },
      });
    } catch (error) {
      next(error);
    }
  };

  listUserOrders: GetOrdersList = async (req, res, next) => {
    try {
      const user = res.locals.user;

      const { orders, pagination } = await this.orderService.listUserOrders(user.id, req.query);

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
      const userId = req.query.userId;
      const orderId = req.params.orderId;

      // cancel order
      const order = await this.orderService.cancelUserOrder(orderId, userId);

      // void payment
      if (order.paymentMethod === 'CARD' && order.paymentDetails?.transactionRef) {
        await this.paymentService.refund(order.paymentDetails.transactionRef);
      }

      // notify user with order cancellation
      if (order.user?.email) {
        await this.notificationService.sendOrderCancellationEmail(order.user.email, order.id);
      }

      return res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };

  updateOrderStatus: UpdateOrderStatus = async (req, res, next) => {
    try {
      const { orderStatus } = req.body;
      const order = await this.orderService.updateOrderStatus(req.params.orderId, req.body);

      if (order.user?.email) {
        await this.notificationService.sendOrderConfirmationEmail(
          order.user.email,
          order.id,
          orderStatus
        );
      }

      return res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };
}
