import type {
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderResponse,
  ListOrdersResponse,
  PaymentStatusType,
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
  Query,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { PaymobService } from '../../lib/paymob/paymob.service.js';
import { authorization, authorizeRole } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validateHandler.js';
import { AddressService } from '../address/address.service.js';
import { DiscountService } from '../discount/discount.service.js';
import { EmailNotification } from '../notification/email.notification.js';
import { NotificationService } from '../notification/notification.service.js';
import { PaymentService } from '../payment/payment.service.js';
import { ShoppingService } from '../shopping/shopping.service.js';
import { StockService } from '../stock/stock.service.js';
import { OrderService } from './order.service.js';

@Tags('Order')
@Route('api/v1/orders')
@Security('JWT_SECRET')
@Middlewares([authorization])
export class OrderController extends Controller {
  private readonly orderService: OrderService;
  private readonly stockService: StockService;
  private readonly discountService: DiscountService;
  private readonly shoppingService: ShoppingService;
  private readonly addressService: AddressService;
  private readonly paymentService: PaymentService;
  private readonly notificationService: NotificationService;

  constructor() {
    super();

    this.paymentService = new PaymentService(new PaymobService());

    this.orderService = new OrderService(db);
    this.stockService = new StockService(db);
    this.discountService = new DiscountService(db);
    this.shoppingService = new ShoppingService(db);
    this.addressService = new AddressService(db);
    this.notificationService = new NotificationService(new EmailNotification());
  }

  /** Creates a new order for current authenticated user */
  @Post()
  @SuccessResponse('201', 'Order created successfully')
  @Middlewares([validate(CreateOrderSchema)])
  public async create(
    @Request() req: ExRequest,
    @Body() body: CreateOrderRequest['body']
  ): Promise<CreateOrderResponse> {
    const user = req.res?.locals.user;
    const { paymentMethod } = body;

    const userCart = await this.shoppingService.cart.get(user.id);

    const discountedUserCart = await this.discountService.applyDiscount(userCart);

    const address = await this.addressService.find(user.id, body.addressId);

    await this.stockService.decrease(discountedUserCart);

    try {
      const { items, shipping, ...order } = await this.orderService.create(
        { userId: user.id, ...body },
        discountedUserCart,
        address
      );

      let payment;
      if (paymentMethod === 'CARD') {
        payment = await this.paymentService.checkout({
          user,
          order: { shipping, ...order },
          items,
          shipping: address,
        });
      }

      return { success: true, data: payment };
    } finally {
      await this.shoppingService.cart.deleteMany(user.id);
    }
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
  public async list(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Query() search?: string,
    @Query() userId?: number
  ): Promise<ListOrdersResponse> {
    const { orders, pagination } = await this.orderService.list({ page, limit, search, userId });

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
    // eslint-disable-next-line no-unused-vars
    @Queries() _: DeleteOrderRequest['query']
  ): Promise<DeleteOrderResponse> {
    // cancel order
    const order = await this.orderService.update(+orderId, {
      orderStatus: OrderStatus.CANCELLED,
      paymentStatus: undefined as unknown as PaymentStatusType,
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
