import type {
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export type CreateOrder = ExpressHandler<
  CreateOrderRequest['body'],
  CreateOrderResponse,
  undefined,
  LocalUser
>;

export type GetOrder = ExpressHandlerWithParams<
  GetOrderRequest['params'],
  undefined,
  GetOrderResponse,
  undefined,
  LocalUser
>;

export type ListOrders = ExpressHandler<
  undefined,
  ListOrdersResponse,
  Required<ListOrdersRequest['query']>,
  LocalUser
>;

export type UpdateOrderStatus = ExpressHandlerWithParams<
  UpdateOrderRequest['params'],
  UpdateOrderRequest['body'],
  UpdateOrderResponse,
  undefined,
  LocalUser
>;

export type DeleteOrder = ExpressHandlerWithParams<
  DeleteOrderRequest['params'],
  undefined,
  DeleteOrderResponse,
  DeleteOrderRequest['query'],
  LocalUser
>;

export interface IOrderController {
  createOrder: CreateOrder;
  getOrder: GetOrder;
  listOrders: ListOrders;
  updateOrderStatus: UpdateOrderStatus;
  deleteOrder: DeleteOrder;
}
