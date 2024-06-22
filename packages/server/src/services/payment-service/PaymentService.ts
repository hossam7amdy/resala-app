import type {
  Address,
  DefaultFilters,
  GetPaymentResponse,
  GetPaymentsListResponse,
  OrderItem,
} from '@resala/shared';

import type { PaymentRepository } from '../../repositories/index.js';
import { NotFoundError } from '../../utils/ApiErrors.js';
import type PaymobPaymentService from '../paymob-payment-service/PaymobPaymentService.js';
import type Response from '../paymob-payment-service/data/response.json';

export default class PaymentService {
  constructor(
    private readonly paymentRepo: PaymentRepository,
    private readonly paymobService: PaymobPaymentService
  ) {}

  async createPaymentRequest(payload: {
    email: string;
    orderId: number;
    amount: number;
    shipping: Address;
    items: Omit<OrderItem, 'id' | 'createdAt' | 'updatedAt'>[];
  }) {
    const { token } = await this.paymobService.authenticate();

    const { id } = await this.paymobService.createOrder({
      auth_token: token,
      delivery_needed: false,
      amount_cents: payload.amount * 100,
      merchant_order_id: payload.orderId,
      items: payload.items.map(item => ({
        name: item.name,
        amount_cents: item.price * 100,
        description: `${item.color}, ${item.size}`,
        quantity: item.quantity,
      })),
    });

    return await this.paymobService.checkout({
      order_id: id,
      auth_token: token,
      billing_data: {
        first_name: payload.shipping.firstName,
        last_name: payload.shipping.lastName,
        email: payload.email,
        phone_number: payload.shipping.phone,
        country: payload.shipping.country,
        state: payload.shipping.state,
        city: payload.shipping.city,
        street: payload.shipping.street || payload.shipping.address || 'NA',
        building: payload.shipping.building || 'NA',
        floor: `${payload.shipping.floor}` || 'NA',
        apartment: 'NA',
        postal_code: 'NA',
        shipping_method: 'COURIER',
      },
      expiration: 3600,
      amount_cents: payload.amount,
      lock_order_when_paid: true,
    });
  }

  async voidPayment(orderId: number) {
    const order = await this.findPaymentByOrderId(orderId);

    const { token } = await this.paymobService.authenticate();

    return await this.paymobService.voidTransaction({
      transaction_id: order.transactionId,
      access_token: token,
    });
  }

  async refundPayment(orderId: number) {
    const order = await this.findPaymentByOrderId(orderId);

    const { token } = await this.paymobService.authenticate();

    return await this.paymobService.refundTransaction({
      transaction_id: order.transactionId,
      amount_cents: Number(order.amountCents) * 100,
      auth_token: token,
    });
  }

  async createPayment(hmac: string, payload: (typeof Response)['obj']) {
    const authenticated = await this.paymobService.authenticateCallback(hmac, payload);

    if (!authenticated) {
      throw new Error('Unauthorized request');
    }

    const payment = {
      orderId: Number(payload.order.merchant_order_id),
      transactionId: payload.id,
      transactionOrderId: payload.order.id,
      pending: payload.pending,
      success: payload.success,
      isAuth: payload.is_auth,
      isVoided: payload.is_voided,
      isCapture: payload.is_capture,
      isRefunded: payload.is_refunded,
      is3DSecure: payload.is_3d_secure,
      integrationId: payload.integration_id,
      deliveryNeeded: payload.order.delivery_needed,
      amountCents: payload.amount_cents,
      currency: payload.currency,
      createdAt: new Date(payload.created_at),
    };

    await this.paymentRepo.create({
      ...payment,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return 'Payment created';
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

  _getPaymentStatus(payment: (typeof Response)['obj']) {
    if (payment.pending) {
      return 'UNPAID';
    } else if (payment.is_voided) {
      return 'VOIDED';
    } else if (payment.is_refunded) {
      return 'REFUNDED';
    } else if (payment.success) {
      return 'PAID';
    } else {
      return 'FAILED';
    }
  }
}
