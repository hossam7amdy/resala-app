import { logger } from '../../lib/logger/logger.js';
import {
  communicationService,
  orderService,
  paymentService,
  shoppingService,
  userService,
} from '../../service/index.js';
import { BadRequestError } from '../../utils/api-errors.js';
import type {
  CreateOrder,
  DeleteOrder,
  GetOrder,
  GetOrdersList,
  UpdateOrderStatus,
} from './order-controller.interface.js';

export const createOrder: CreateOrder = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const { addressId, paymentMethod, note } = req.body;

    // order items
    const cart = await shoppingService.getUserCart(user.id);
    if (cart.length === 0) {
      throw new BadRequestError('Cart is empty');
    }

    // shipping address
    const { id, ...address } = await userService.findUserAddress(user.id, addressId);

    const orderItems = cart.map(item => ({
      name: item.stock.product.enName,
      price: item.stock.product.price,
      quantity: item.quantity,
      color: item.stock.color.enName,
      size: item.stock.size.name,
    }));

    // create order
    const order = await orderService.createOrder({
      userId: user.id,
      address,
      paymentMethod,
      note,
      items: orderItems,
    });

    let payment = null;
    if (paymentMethod === 'CARD') {
      // create payment
      payment = await paymentService.createPaymentRequest({
        orderId: order.id,
        email: user.email,
        amount: Number(order.total) * 100,
        shipping: { id, ...address },
        items: orderItems.map(item => ({
          ...item,
          amount_cents: Number(item.price) * 100,
        })),
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        order,
        payment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder: GetOrder = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const orderId = req.params.orderId;

    const order = await orderService.findUserOrderById(orderId, user.id);

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersList: GetOrdersList = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const { page, limit } = req.query;

    const { orders, total } = await orderService.getUserOrders(user.id, { page, limit });

    return res.status(200).json({
      success: true,
      data: {
        pagination: {
          page,
          limit,
          total,
        },
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder: DeleteOrder = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const orderId = req.params.orderId;

    // cancel order
    const order = await orderService.cancelUserOrder(orderId, user.id);

    // void payment
    if (order.paymentMethod === 'CARD' && order.paymentDetails) {
      await paymentService.voidPayment(order.paymentDetails.transactionId);
    }

    // notify user with order cancellation
    communicationService
      .sendOrderCancellationEmail(order.user?.email!, order.id)
      .catch(logger.warn);

    return res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const adminGetOrder: GetOrder = async (req, res, next) => {
  try {
    const order = await orderService.findOrderById(req.params.orderId);

    return res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const adminGetOrdersList: GetOrdersList = async (req, res, next) => {
  try {
    const { page, limit, query } = req.query;

    const { orders, total } = await orderService.listOrders({ page, limit, query });

    return res.json({
      success: true,
      data: {
        pagination: {
          page,
          limit,
          total,
        },
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const adminDeleteOrder: DeleteOrder = async (req, res, next) => {
  try {
    // Cancel order
    const order = await orderService.adminCancelOrder(req.params.orderId);

    // Refund payment if paid by card
    if (order.paymentMethod === 'CARD' && order.paymentDetails) {
      await paymentService.refundPayment(
        order.paymentDetails.transactionId,
        Number(order.total) * 100
      );
    }

    // Notify user with order cancellation
    communicationService
      .sendOrderCancellationEmail(order.user?.email!, order.id)
      .catch(logger.warn);

    return res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const adminUpdateOrderStatus: UpdateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(req.params.orderId, status);

    // Notify user with order fulfillment
    if (status === 'FULFILLED') {
      communicationService
        .sendOrderConfirmationEmail(order.user?.email!, order.id)
        .catch(logger.warn);
    }

    return res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
