import type {
  Address,
  DefaultFilters,
  GetPaymentResponse,
  GetPaymentsListResponse,
  Order,
  OrderItem,
  User,
} from '@resala/shared';

import type { PaymentRepository } from '../../repositories/index.js';
import { NotFoundError } from '../../utils/ApiErrors.js';
import type PaymobPaymentService from '../paymob-payment-service/PaymobPaymentService.js';
import type { TransactionObject } from '../paymob-payment-service/types.js';

export default class PaymentService {
  constructor(
    private readonly paymentRepo: PaymentRepository,
    private readonly paymobService: PaymobPaymentService
  ) {}

  async checkout(payload: {
    user: User;
    order: Order;
    shipping: Omit<Address, 'id'>;
    items: Omit<OrderItem, 'id' | 'createdAt' | 'updatedAt'>[];
  }): Promise<{ paymentUrl: string }> {
    return this.paymobService.checkout(payload);
  }

  async void(transactionId: number) {
    await this.paymobService.void(transactionId);

    return this.paymentRepo.update(transactionId, {
      isVoided: true,
    });
  }

  async refund(transactionId: number) {
    const transaction = await this.paymobService.retrieve(transactionId);

    await this.paymobService.refund(transactionId, transaction.amount_cents);
  }

  async createPayment(hmac: string, payload: TransactionObject) {
    const verified = this.paymobService.verify(hmac, payload);

    if (!verified) {
      throw new Error('Unauthorized request');
    }

    const { obj } = payload;
    const payment = {
      orderId: Number(obj.order.merchant_order_id),
      transactionId: obj.id,
      transactionOrderId: obj.order.id,
      pending: obj.pending,
      success: obj.success,
      isAuth: obj.is_auth,
      isVoided: obj.is_voided,
      isCapture: obj.is_capture,
      isRefunded: obj.is_refunded,
      is3DSecure: obj.is_3d_secure,
      integrationId: obj.integration_id,
      deliveryNeeded: obj.order.delivery_needed,
      amountCents: obj.amount_cents,
      currency: obj.currency,
      createdAt: new Date(obj.created_at),
    };

    await this.paymentRepo.create({
      ...payment,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async getPayment(paymentId: number): Promise<GetPaymentResponse['data']> {
    const payment = await this.paymentRepo.findById(paymentId);

    if (!payment) {
      throw new NotFoundError('Payment not found');
    }

    return payment;
  }

  async listPayments({
    page,
    limit,
  }: Omit<DefaultFilters, 'query'>): Promise<GetPaymentsListResponse['data']> {
    const { total, payments } = await this.paymentRepo.list({ page, limit });

    return {
      pagination: { total, page, limit },
      payments,
    };
  }

  async findPaymentByOrderId(orderId: number) {
    const payment = await this.paymentRepo.findByOrderId(orderId);

    if (!payment) {
      throw new NotFoundError('Payment not found');
    }

    return payment;
  }

  _getPaymentStatus({ obj }: TransactionObject) {
    if (obj.pending) {
      return 'UNPAID';
    } else if (obj.is_voided) {
      return 'VOIDED';
    } else if (obj.is_refunded) {
      return 'REFUNDED';
    } else if (obj.success) {
      return 'PAID';
    } else {
      return 'FAILED';
    }
  }
}
