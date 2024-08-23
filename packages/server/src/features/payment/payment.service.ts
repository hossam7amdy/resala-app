import type { Address, GetPaymentResponse, Order, OrderItem, User } from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import { BadRequestError, NotFoundError } from '../../errors/api.errors.js';
import type { PaymobService } from './paymob/index.js';

export class PaymentService {
  constructor(
    private readonly db: DataStore,
    private readonly paymobService: PaymobService
  ) {}

  async checkout(payload: {
    user: User;
    order: Order & { shipping: number };
    shipping: Omit<Address, 'id'>;
    items: Omit<OrderItem, 'id' | 'createdAt' | 'updatedAt'>[];
  }): Promise<{ paymentUrl: string }> {
    const { payment_link, ...rest } = await this.paymobService.checkout(payload);

    await this.db.payment.create({
      data: {
        paymentLink: payment_link,
        orderId: payload.order.id,
        transactionId: +rest.special_reference || null,
        transactionOrderId: null,
      },
    });

    return { paymentUrl: payment_link };
  }

  async void(transactionId: number): Promise<void> {
    try {
      await this.paymobService.void(transactionId);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async refund(transactionId: number, amount: number): Promise<void> {
    try {
      const amountCents = amount * 100;

      await this.paymobService.refund(transactionId, amountCents);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async retrieve(transactionId: number): Promise<GetPaymentResponse['data']> {
    try {
      return await this.paymobService.retrieve(transactionId);
    } catch (e) {
      throw new NotFoundError((e as Error).message);
    }
  }
}
