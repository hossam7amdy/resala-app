import type {
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersListRequest,
  GetOrdersListResponse,
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

export type GetOrdersList = ExpressHandler<
  undefined,
  GetOrdersListResponse,
  Required<GetOrdersListRequest['query']>,
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
  undefined,
  LocalUser
>;

export default interface IOrderController {
  createOrder: CreateOrder;
  getOrder: GetOrder;
  getOrdersList: GetOrdersList;
  updateOrderStatus: UpdateOrderStatus;
  deleteOrder: DeleteOrder;
}
