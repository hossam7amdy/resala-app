import type {
  Address,
  DefaultFilters,
  GetPaymentResponse,
  GetPaymentsListResponse,
  Order,
  OrderItem,
  Payment,
  PaymentStatusType,
  User,
} from '@resala/shared';

import type { PaymentRepository } from '../../repositories/index.js';
import { NotFoundError } from '../../utils/ApiErrors.js';
import type PaymobPaymentService from '../paymob-payment-service/PaymobPaymentService.js';
import type {
  ProcessedCallbackObject,
  ResponseCallbackObject,
  VerifyDto,
} from '../paymob-payment-service/types.js';

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

    await this.paymentProcessedCallback({
      paymentUrl,
      orderId: payload.order.id,
      orderRef: null,
      transactionRef: null,
    });

    return { paymentUrl };
  }

  async void(orderId: number) {
    const payment = await this.findPayment(orderId);

    return await this.paymobService.void(payment.transactionRef!);
  }

  async refund(orderId: number) {
    const payment = await this.findPayment(orderId);

    if (!payment.metadata?.amount_cents) {
      throw new NotFoundError('Payment not found');
    }

    return await this.paymobService.refund(orderId, payment.metadata.amount_cents);
  }

  async paymentProcessedCallback(payload: Payment) {
    return await this.paymentRepo.create(payload);
  }

  async updatePayment(orderId: number, payload: Partial<Payment>) {
    return await this.paymentRepo.update(orderId, payload);
  }

  async findPayment(orderId: number): Promise<GetPaymentResponse['data']> {
    const payment = await this.paymentRepo.findByOrderId(orderId);
    const metadata =
      payment?.transactionRef && (await this.paymobService.retrieve(payment.transactionRef));

    if (!metadata) {
      throw new NotFoundError('Payment not found');
    }

    return { ...payment, metadata };
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

  async handleResponseCb(
    orderId: number,
    hmac: string,
    obj: ResponseCallbackObject
  ): Promise<PaymentStatusType> {
    const verifyDto: VerifyDto = {
      orderId: obj.order,
      sourceDataPan: obj['source_data.pan'],
      sourceDataSubType: obj['source_data.sub_type'],
      sourceDataType: obj['source_data.type'],
      amount_cents: obj.amount_cents,
      created_at: obj.created_at,
      currency: obj.currency,
      error_occured: obj.error_occured,
      has_parent_transaction: obj.has_parent_transaction,
      id: obj.id,
      integration_id: obj.integration_id,
      is_3d_secure: obj.is_3d_secure,
      is_auth: obj.is_auth,
      is_capture: obj.is_capture,
      is_refunded: obj.is_refunded,
      is_standalone_payment: obj.is_standalone_payment,
      is_voided: obj.is_voided,
      owner: obj.owner,
      pending: obj.pending,
      success: obj.success,
    };

    await this.paymobService.verify(hmac, verifyDto);
    await this.updatePayment(orderId, {
      orderRef: +verifyDto.orderId,
      transactionRef: +verifyDto.id,
    });

    return this._status(verifyDto);
  }

  async handleProcessedCb(
    orderId: number,
    hmac: string,
    { obj }: ProcessedCallbackObject
  ): Promise<PaymentStatusType> {
    const verifyDto: VerifyDto = {
      amount_cents: obj.amount_cents.toString(),
      created_at: obj.created_at,
      currency: obj.currency,
      error_occured: obj.error_occured.toString(),
      has_parent_transaction: obj.has_parent_transaction.toString(),
      id: obj.id.toString(),
      integration_id: obj.integration_id.toString(),
      is_3d_secure: obj.is_3d_secure.toString(),
      is_auth: obj.is_auth.toString(),
      is_capture: obj.is_capture.toString(),
      is_refunded: obj.is_refunded.toString(),
      is_standalone_payment: obj.is_standalone_payment.toString(),
      is_voided: obj.is_voided.toString(),
      orderId: obj.order.toString(),
      owner: obj.owner.toString(),
      pending: obj.pending.toString(),
      sourceDataPan: obj.source_data.pan,
      sourceDataSubType: obj.source_data.sub_type,
      sourceDataType: obj.source_data.type,
      success: obj.success.toString(),
    };

    await this.paymobService.verify(hmac, verifyDto);
    await this.updatePayment(orderId, {
      orderRef: +verifyDto.orderId,
      transactionRef: +verifyDto.id,
    });

    return this._status(verifyDto);
  }

  _status(obj: VerifyDto): PaymentStatusType {
    if (obj.is_refunded === 'true') return 'REFUNDED';
    if (obj.is_voided === 'true') return 'VOIDED';
    if (obj.error_occured === 'true') return 'FAILED';
    if (obj.success === 'true') return 'PAID';
    return 'UNPAID';
  }
}
