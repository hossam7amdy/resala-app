import type {
  CreateAddressRequest,
  GetCartResponse,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  Order,
  OrderItem,
  PaymentMethodType,
  UpdateOrderRequest,
} from '@resala/shared';

type OrderDto = Order;

type CreateOrderRequestDto = {
  userId: string;
  paymentMethod: PaymentMethodType;
  cart: GetCartResponse['data'];
  shippingAddress: CreateAddressRequest['body'];
  note?: string;
};
type CreateOrderResponseDto = OrderDto & {
  orderItems: {
    productId: string;
    stockId: string;
    quantity: number;
    price: OrderItem['price'];
    productName: string;
    description: string;
  }[];
};

type GetOrderResponseDto = GetOrderResponse['data'];

type ListOrdersRequestDto = ListOrdersRequest['query'];
type ListOrdersResponseDto = ListOrdersResponse['data'];

type UpdateOrderRequestDto = UpdateOrderRequest['body'];

export type {
  OrderDto,
  CreateOrderRequestDto,
  CreateOrderResponseDto,
  GetOrderResponseDto,
  ListOrdersRequestDto,
  ListOrdersResponseDto,
  UpdateOrderRequestDto,
};
