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

export interface CreateOrder
  extends ExpressHandler<CreateOrderRequest['body'], CreateOrderResponse, {}, LocalUser> {}

export interface GetOrder
  extends ExpressHandlerWithParams<
    GetOrderRequest['params'],
    {},
    GetOrderResponse,
    {},
    LocalUser
  > {}

export interface GetOrdersList
  extends ExpressHandler<
    {},
    GetOrdersListResponse,
    Required<GetOrdersListRequest['query']>,
    LocalUser
  > {}

export interface UpdateOrderStatus
  extends ExpressHandlerWithParams<
    UpdateOrderRequest['params'],
    UpdateOrderRequest['body'],
    UpdateOrderResponse,
    {},
    LocalUser
  > {}

export interface DeleteOrder
  extends ExpressHandlerWithParams<
    DeleteOrderRequest['params'],
    {},
    DeleteOrderResponse,
    {},
    LocalUser
  > {}
