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
    hmac: string,
    { obj }: PostPayCallbackObject
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

    await this.paymentRepo.update(orderId, {
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
