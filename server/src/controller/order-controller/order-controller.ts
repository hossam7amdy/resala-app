import { RequestHandler } from 'express';

import { orderService, paymentService, shoppingService, userService } from '../../service';
import { BadRequestError } from '../../utils/api-errors';

export const createOrder: RequestHandler = async (req, res, next) => {
  const user = res.locals.user;
  const { addressId, paymentMethod, note } = req.body;

  try {
    // order items
    const cart = await shoppingService.getUserCart(user.id);
    if (cart.length === 0) {
      throw new BadRequestError('Cart is empty');
    }

    // shipping address
    const { id, ...address } = await userService.findUserAddress(user.id, addressId);

    const orderItems = cart.map(item => ({
      name: item.product.enName,
      price: item.product.price,
      quantity: item.quantity,
      color: item.color.enName,
      size: item.size.name,
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
        amount: Number(order.total),
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

export const getOrder: RequestHandler = async (req, res, next) => {
  const user = res.locals.user;
  const orderId = Number(req.params.orderId);

  try {
    if (isNaN(orderId)) {
      throw new BadRequestError('Invalid order id');
    }

    const order = await orderService.findOrderById(orderId, user.id);

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersList: RequestHandler = async (req, res, next) => {
  const user = res.locals.user;

  try {
    const orders = await orderService.getUserOrders(user.id, {
      query: '',
      page: Number(req.query.page) || 0,
      limit: Number(req.query.limit) || 10,
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
