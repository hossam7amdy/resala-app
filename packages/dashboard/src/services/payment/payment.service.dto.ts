import type { Decimal } from '@prisma/client/runtime/library';
import type { Address } from '@resala/shared';

export interface CheckoutCreateParams {
  orderId: string;
  orderItems: {
    productId: string;
    stockId: string;
    quantity: number;
    price: Decimal;
    productName: string;
    description: string;
  }[];
  billingData: Address & { email: string };
}
