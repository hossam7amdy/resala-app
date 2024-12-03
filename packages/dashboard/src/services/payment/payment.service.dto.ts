import type { Address } from '@prisma/client';
import type { Decimal } from '@prisma/client/runtime/library';

export interface CheckoutCreateParams {
  orderId: number;
  orderItems: {
    productId: number;
    stockId: number;
    quantity: number;
    price: Decimal;
    productName: string;
    description: string;
  }[];
  billingData: Address & { email: string };
}
