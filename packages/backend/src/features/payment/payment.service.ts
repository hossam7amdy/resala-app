import type { Configuration } from '@/configuration';
import { BadRequestError, NotFoundError } from '@/exceptions';
import type { PaymentPort } from '@/interfaces';
import { Decimal } from '@prisma/client/runtime/library';
import type { GetPaymentResponse } from '@resala/shared';

import type { CheckoutParams } from './payment.service.dto';

export class PaymentService {
  constructor(
    private config: Configuration,
    private _payment: PaymentPort
  ) {}

  async checkout({
    orderId,
    orderItems,
    billingData,
  }: CheckoutParams): Promise<{ paymentUrl: string }> {
    const total = orderItems.reduce(
      (acc, item) => new Decimal(item.price).mul(item.quantity).add(acc),
      new Decimal(0)
    );

    const paymentLink = await this._payment.checkout({
      redirectionUrl: `${this.config.payment.redirectionUrl}/${orderId}/`,
      notificationUrl: `${this.config.payment.notificationUrl}/${orderId}/`,
      currency: 'EGP',
      amount: total.toDecimalPlaces(2).toNumber(),
      billingData: {
        email: billingData.email,
        firstName: billingData.firstName,
        lastName: billingData.lastName,
        street: billingData.street,
        phoneNumber: billingData.phone,
        city: billingData.city,
        state: billingData.state,
        country: billingData.country,
        apartment: billingData.address || 'NA',
        building: billingData.building || 'NA',
        floor: billingData.floor?.toString() || 'NA',
      },
    });

    return { paymentUrl: paymentLink };
  }

  async void(transactionId: string): Promise<void> {
    try {
      await this._payment.void(+transactionId);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async refund(transactionId: string, amount: number): Promise<void> {
    try {
      await this._payment.refund(transactionId, amount);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async retrieve(transactionId: string): Promise<GetPaymentResponse['data']> {
    try {
      const { refundedAmountCents, amountCents, ...transaction } =
        await this._payment.retrieve(transactionId);

      return {
        ...transaction,
        id: transactionId,
        amount: new Decimal(amountCents).div(100).toNumber(),
        refundedAmount: refundedAmountCents
          ? new Decimal(refundedAmountCents).div(100).toNumber()
          : null,
      };
    } catch (e) {
      throw new NotFoundError((e as Error).message);
    }
  }
}
