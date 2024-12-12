import type { CreateAddressRequest, GetCartResponse, PaymentMethodType } from '@resala/shared';

type CreateOrderRequestDto = {
  userId: string;
  paymentMethod: PaymentMethodType;
  cart: GetCartResponse['data'];
  shippingAddress: CreateAddressRequest['body'];
  note?: string;
};

export type { CreateOrderRequestDto };
