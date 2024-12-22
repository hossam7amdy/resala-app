import type { Configuration } from '@/configuration';
import { BadRequestError, NotFoundError } from '@/exceptions';
import { Decimal } from '@prisma/client/runtime/library';
import type { GetPaymentResponse } from '@resala/shared';

import type { PaymobService } from '../paymob';
import type { CheckoutCreateParams } from './payment.service.dto';

export class PaymentService {
  constructor(
    private config: Configuration,
    private _paymobService: PaymobService
  ) {}

  async checkout({
    orderId,
    orderItems,
    billingData,
  }: CheckoutCreateParams): Promise<{ paymentUrl: string }> {
    const total = orderItems.reduce(
      (acc, item) => new Decimal(item.price).mul(item.quantity).add(acc),
      new Decimal(0)
    );

    const { paymentLink } = await this._paymobService.checkout({
      redirection_url: `${this.config.payment.redirectionUrl}/${orderId}/`,
      notification_url: `${this.config.payment.notificationUrl}/${orderId}/`,
      currency: 'EGP',
      items: orderItems.map(item => ({
        name: item.productName,
        amount: +item.price,
        quantity: item.quantity,
        description: item.description,
      })),
      amount: total.toDecimalPlaces(2).toNumber(),
      billing_data: {
        email: billingData.email,
        apartment: billingData.address || 'NA',
        first_name: billingData.firstName,
        last_name: billingData.lastName,
        street: billingData.street,
        building: billingData.building || 'NA',
        phone_number: billingData.phone,
        city: billingData.city,
        country: billingData.country,
        floor: billingData.floor?.toString() || 'NA',
        state: billingData.state,
      },
    });

    return { paymentUrl: paymentLink };
  }

  async void(transactionId: string): Promise<void> {
    try {
      await this._paymobService.void(+transactionId);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async refund(transactionId: string, amount: number): Promise<void> {
    try {
      await this._paymobService.refund(+transactionId, amount);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async retrieve(transactionId: string): Promise<GetPaymentResponse['data']> {
    try {
      const transaction = await this._paymobService.retrieve(+transactionId);

      return {
        id: transaction.id.toString(),
        amount: transaction.amount_cents / 100,
        currency: transaction.currency,
        pending: transaction.pending,
        success: transaction.success,
        isCapture: transaction.is_capture,
        isStandalonePayment: transaction.is_standalone_payment,
        isVoided: transaction.is_voided,
        isRefunded: transaction.is_refunded,
        is3dSecure: transaction.is_3d_secure,
        createdAt: transaction.created_at,
        paymentMethod: transaction.source_data.type,
      };
    } catch (e) {
      throw new NotFoundError((e as Error).message);
    }
  }
}
