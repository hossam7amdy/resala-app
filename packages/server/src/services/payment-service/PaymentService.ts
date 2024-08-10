import type {
  Address,
  GetPaymentResponse,
  Order,
  OrderItem,
  PaymentStatusType,
  User,
} from '@resala/shared';

import type { PaymentRepository } from '../../repositories/index.js';
import { BadRequestError, NotFoundError } from '../../utils/ApiErrors.js';
import type PaymobPaymentService from '../paymob-payment-service/PaymobPaymentService.js';
import type { PostPayCallbackObject, Transaction } from '../paymob-payment-service/types.js';

export default class PaymentService {
  constructor(
    private readonly paymentRepo: PaymentRepository,
    private readonly paymobService: PaymobPaymentService
  ) {}

  async checkout(payload: {
    user: User;
    order: Order & { shipping: number };
    shipping: Omit<Address, 'id'>;
    items: Omit<OrderItem, 'id' | 'createdAt' | 'updatedAt'>[];
  }): Promise<{ paymentUrl: string }> {
    const { payment_link } = await this.paymobService.checkout(payload);

    await this.paymentRepo.create({
      paymentLink: payment_link,
      orderId: payload.order.id,
      transactionId: null,
      transactionOrderId: null,
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
      return this.paymobService.retrieve(transactionId);
    } catch (e) {
      throw new NotFoundError((e as Error).message);
    }
  }

  async postPayCallback(
    orderId: number,
    postPayObj: PostPayCallbackObject
  ): Promise<PaymentStatusType | undefined> {
    this.paymobService.verify(postPayObj).catch(console.error);

    const transaction = postPayObj.transaction;

    await this.paymentRepo.update(orderId, {
      transactionId: transaction.id,
      transactionOrderId: transaction.order.id,
    });

    return this._status(transaction);
  }

  _status(transaction: Transaction): PaymentStatusType | undefined {
    if (transaction.is_voided) return 'VOIDED';
    if (transaction.is_refunded) return 'REFUNDED';
    if (transaction.error_occured) return 'FAILED';
    if (transaction.success) return 'PAID';
    if (transaction.pending) return 'UNPAID';
  }
}
