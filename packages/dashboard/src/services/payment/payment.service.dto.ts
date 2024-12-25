import type { CreateAddressRequest, OrderItem } from '@resala/shared';

export interface CheckoutParams {
  orderId: string;
  orderItems: {
    productId: string;
    stockId: string;
    quantity: number;
    price: OrderItem['price'];
    productName: string;
    description: string;
  }[];
  billingData: CreateAddressRequest['body'] & { email: string };
}
