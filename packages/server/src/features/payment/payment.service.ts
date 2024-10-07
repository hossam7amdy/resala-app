import type { GetPaymentResponse } from '@resala/shared';

import { BadRequestError, NotFoundError } from '../../errors/api.errors.js';
import type { CheckoutDto, PaymobService } from '../../services/paymob/index.js';

export class PaymentService {
  constructor(private readonly paymobService: PaymobService) {}

  async checkout(payload: CheckoutDto): Promise<{ paymentUrl: string }> {
    const { payment_link } = await this.paymobService.checkout(payload);

    return { paymentUrl: payment_link };
  }

  async void(transactionId: string): Promise<void> {
    try {
      await this.paymobService.void(+transactionId);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async refund(transactionId: string, amount: number): Promise<void> {
    try {
      const amountCents = amount * 100;

      await this.paymobService.refund(+transactionId, amountCents);
    } catch (e) {
      throw new BadRequestError((e as Error).message);
    }
  }

  async retrieve(transactionId: string): Promise<GetPaymentResponse['data']> {
    try {
      return await this.paymobService.retrieve(+transactionId);
    } catch (e) {
      throw new NotFoundError((e as Error).message);
    }
  }
}
