import type {
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '@resala/shared';
import {
  CreateOrderSchema,
  DeleteOrderSchema,
  GetOrderSchema,
  ListOrdersSchema,
  OrderStatus,
  UpdateOrderStatusSchema,
} from '@resala/shared';
import type { Request as ExRequest } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Patch,
  Path,
  Post,
  Queries,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { authorization, authorizeRole } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validateHandler.js';
import { AddressService } from '../address/address.service.js';
import { EmailNotification } from '../notification/email.notification.js';
import { NotificationService } from '../notification/notification.service.js';
import { PaymentService } from '../payment/payment.service.js';
import { PaymobService } from '../payment/paymob/paymob.service.js';
import { ShoppingService } from '../shopping/shopping.service.js';
import { StockService } from '../stock/stock.service.js';
import { OrderService } from './order.service.js';

@Tags('Order')
@Route('api/v1/orders')
@Security('jwt_auth')
@Middlewares([authorization])
export class OrderController extends Controller {
  private readonly orderService: OrderService;
  private readonly paymentService: PaymentService;
  private readonly notificationService: NotificationService;

  constructor() {
    super();

    this.paymentService = new PaymentService(db, new PaymobService());
    this.notificationService = new NotificationService(new EmailNotification());
    this.orderService = new OrderService(
      db,
      new AddressService(db),
      new StockService(db),
      new ShoppingService(db)
    );
  }

  /** Creates a new order for current authenticated user */
  @Post()
  @SuccessResponse('201', 'Order created successfully')
  @Middlewares([validate(CreateOrderSchema)])
  public async create(
    @Request() req: ExRequest,
    @Body() body: CreateOrderRequest['body']
  ): Promise<CreateOrderResponse> {
    const user = req?.res?.locals.user;
    const { addressId, paymentMethod, note } = body;

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

    return { success: true, data: payment };
  }

  /** Get order details **Only admins can access this endpoint** */
  @Get('{orderId}')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(GetOrderSchema)])
  public async get(@Path() orderId: string): Promise<GetOrderResponse> {
    const order = await this.orderService.find(+orderId);

    return { success: true, data: order };
  }

  /** List orders with pagination */
  @Get()
  @Middlewares([validate(ListOrdersSchema)])
  public async list(@Queries() query: ListOrdersRequest['query']): Promise<ListOrdersResponse> {
    const { orders, pagination } = await this.orderService.list(query);

    return {
      success: true,
      data: { pagination, orders },
    };
  }

  /** Delete order, Order details will not deleted from database, it will just marked as canceled **Only admins can access this endpoint** */
  @Delete('{orderId}')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(DeleteOrderSchema)])
  public async delete(
    @Path() orderId: string,
    @Queries() _: DeleteOrderRequest['query']
  ): Promise<DeleteOrderResponse> {
    // cancel order
    const order = await this.orderService.update(+orderId, {
      orderStatus: OrderStatus.CANCELLED,
      paymentStatus: undefined as any,
    });

    // notify user with order cancellation
    if (order.user?.email) {
      await this.notificationService.sendOrderCancellationEmail(order.user.email, order.id);
    }

    return { success: true, data: order };
  }

  /** Update order status **Only admins can access this endpoint** */
  @Patch('{orderId}')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(UpdateOrderStatusSchema)])
  public async updateStatus(
    @Path() orderId: string,
    @Body() body: UpdateOrderRequest['body']
  ): Promise<UpdateOrderResponse> {
    const { orderStatus } = body;
    const order = await this.orderService.update(+orderId, body);

    if (order.user?.email) {
      await this.notificationService.sendOrderConfirmationEmail(
        order.user.email,
        order.id,
        orderStatus as OrderStatus
      );
    }

    return { success: true, data: order };
  }
}
