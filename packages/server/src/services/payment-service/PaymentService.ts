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
import type { PostPayCallbackObject, VerifyDto } from '../paymob-payment-service/types.js';

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
    { transaction, hmac }: PostPayCallbackObject
  ): Promise<PaymentStatusType | undefined> {
    const verifyDto: VerifyDto = {
      amount_cents: transaction.amount_cents.toString(),
      created_at: transaction.created_at,
      currency: transaction.currency,
      error_occured: transaction.error_occured.toString(),
      has_parent_transaction: transaction.has_parent_transaction.toString(),
      id: transaction.id.toString(),
      integration_id: transaction.integration_id.toString(),
      is_3d_secure: transaction.is_3d_secure.toString(),
      is_auth: transaction.is_auth.toString(),
      is_capture: transaction.is_capture.toString(),
      is_refunded: transaction.is_refunded.toString(),
      is_standalone_payment: transaction.is_standalone_payment.toString(),
      is_voided: transaction.is_voided.toString(),
      orderId: transaction.order.toString(),
      owner: transaction.owner.toString(),
      pending: transaction.pending.toString(),
      sourceDataPan: transaction.source_data.pan,
      sourceDataSubType: transaction.source_data.sub_type,
      sourceDataType: transaction.source_data.type,
      success: transaction.success.toString(),
    };

    await this.paymobService.verify(hmac, verifyDto);

    await this.paymentRepo.update(orderId, {
      orderRef: +verifyDto.orderId,
      transactionRef: +verifyDto.id,
    });

    return this._status(verifyDto);
  }

  _status(verifyDto: VerifyDto): PaymentStatusType | undefined {
    if (verifyDto.is_voided === 'true') return 'VOIDED';
    if (verifyDto.is_refunded === 'true') return 'REFUNDED';
    if (verifyDto.error_occured === 'true') return 'FAILED';
    if (verifyDto.success === 'true') return 'PAID';
    if (verifyDto.pending === 'true') return 'UNPAID';
  }
}
