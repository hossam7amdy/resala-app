import { OrderStatus } from '@resala/shared';

import type { NotificationService } from '../notification/notification.service.js';
import type { PaymentService } from '../payment/payment.service.js';
import type {
  CreateOrder,
  DeleteOrder,
  GetOrder,
  ListOrders,
  UpdateOrderStatus,
} from './order.controller.interface.js';
import type { IOrderController } from './order.controller.interface.js';
import type { OrderService } from './order.service.js';

export class OrderController implements IOrderController {
  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService,
    private notificationService: NotificationService
  ) {}

  createOrder: CreateOrder = async (req, res, next) => {
    try {
      const user = res.locals.user;
      const { addressId, paymentMethod, note } = req.body;

      const { address, items, ...order } = await this.orderService.create(user.id, {
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
      const orderId = req.params.orderId;

      const order = await this.orderService.find(orderId);

      return res.status(200).json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };

  listOrders: ListOrders = async (req, res, next) => {
    try {
      const { orders, pagination } = await this.orderService.list(req.query);

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
      const orderId = req.params.orderId;

      // cancel order
      const order = await this.orderService.update(orderId, {
        orderStatus: OrderStatus.CANCELLED,
        paymentStatus: undefined as any,
      });

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
      const order = await this.orderService.update(req.params.orderId, req.body);

      if (order.user?.email) {
        await this.notificationService.sendOrderConfirmationEmail(
          order.user.email,
          order.id,
          orderStatus as OrderStatus
        );
      }

      return res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };
}
