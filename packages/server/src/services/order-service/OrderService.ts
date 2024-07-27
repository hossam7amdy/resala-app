import type {
  CreateOrderRequest,
  DefaultFilters,
  GetOrderResponse,
  ListOrdersResponse,
  Order,
  UpdateOrderRequest,
} from '@resala/shared';

import type { OrderRepository } from '../../repositories/index.js';
import { BadRequestError, NotFoundError } from '../../utils/ApiErrors.js';
import type { ShoppingService, UserService } from '../index.js';

const SHIPPING = 60;

export default class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly shoppingService: ShoppingService,
    private readonly userService: UserService
  ) {}

  async createOrder(userId: number, order: CreateOrderRequest['body']) {
    const userCart = await this.shoppingService.getUserCart(userId);

    if (userCart.items.length === 0) {
      throw new BadRequestError('Cart is empty');
    }

    // eslint-disable-next-line no-unused-vars
    const { id: _, ...address } = await this.userService.findUserAddress(userId, order.addressId);

    const subtotal = userCart.totalPrice;

    const orderPayload = {
      userId,
      address: address,
      paymentMethod: order.paymentMethod,
      shipping: SHIPPING,
      total: SHIPPING + subtotal,
      subtotal,
      note: '',
      items: userCart.items.map(item => ({
        name: item.product.enName,
        price: item.product.price,
        color: item.stock.color.enName,
        size: item.stock.size.name,
        quantity: item.quantity,
        imageUrl: item.images.find(img => img.isPrimary)?.imageUrl || null,
      })),
    };

    const [newOrder] = await Promise.all([
      this.orderRepo.create(orderPayload),
      this.shoppingService.clearUserCart(userId),
    ]);

    return { ...newOrder, ...orderPayload };
  }

  async listOrders({ limit, page, query }: DefaultFilters): Promise<ListOrdersResponse['data']> {
    const { orders, total } = await this.orderRepo.list({ limit, page, query });

    return {
      pagination: { total, page, limit },
      orders,
    };
  }

  async findUserOrderById(id: number, userId: number): Promise<GetOrderResponse['data']> {
    const order = await this.orderRepo.findById(id);

    if (!order || order.userId !== userId) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async findOrderById(id: number): Promise<GetOrderResponse['data']> {
    const order = await this.orderRepo.findById(id);

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async listUserOrders(
    userId: number,
    { limit, page }: Omit<DefaultFilters, 'query'>
  ): Promise<ListOrdersResponse['data']> {
    const { total, orders } = await this.orderRepo.listByUser(userId, { limit, page });

    return {
      pagination: { total, page, limit },
      orders,
    };
  }

  async updateOrder(id: number, order: Partial<Order>) {
    await this.findOrderById(id);

    await this.orderRepo.update(id, {
      ...order,
      updatedAt: new Date(),
    });

    return await this.findOrderById(id);
  }

  async updateOrderStatus(id: number, { orderStatus, paymentStatus }: UpdateOrderRequest['body']) {
    await this.updateOrder(id, { orderStatus, paymentStatus });

    return await this.findOrderById(id);
  }

  async cancelUserOrder(orderId: number, userId: number) {
    await Promise.all([
      this.userService.findUserById(userId),
      this.findUserOrderById(orderId, userId),
    ]);

    return await this.cancelOrder(orderId);
  }

  async cancelOrder(id: number) {
    await this.orderRepo.update(id, {
      orderStatus: 'CANCELLED',
      updatedAt: new Date(),
    });

    return await this.findOrderById(id);
  }
}
