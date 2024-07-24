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
    const { paymentUrl } = await this.paymobService.checkout(payload);

    await this.paymentRepo.create({
      paymentUrl,
      orderId: payload.order.id,
      orderRef: null,
      transactionRef: null,
    });

    return { paymentUrl };
  }

  async void(paymentId: number): Promise<void> {
    try {
      await this.retrieve(paymentId);

      await this.paymobService.void(paymentId);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async refund(paymentId: number): Promise<void> {
    try {
      const payment = await this.retrieve(paymentId);

      await this.paymobService.refund(paymentId, payment.amount_cents);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async retrieve(paymentId: number): Promise<GetPaymentResponse['data']> {
    try {
      return await this.paymobService.retrieve(paymentId);
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
      orderRef: transaction.order.id,
      transactionRef: transaction.id,
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
