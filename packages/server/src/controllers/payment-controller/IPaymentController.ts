import type {
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetPaymentRequest,
  GetPaymentResponse,
  GetPaymentsListRequest,
  GetPaymentsListResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams } from '../../types/index.js';

export type CreatePayment = ExpressHandler<
  CreatePaymentRequest['body'],
  CreatePaymentResponse,
  CreatePaymentRequest['query']
>;

export type GetPayment = ExpressHandlerWithParams<
  GetPaymentRequest['params'],
  undefined,
  GetPaymentResponse
>;

export type GetPaymentList = ExpressHandler<
  undefined,
  GetPaymentsListResponse,
  Required<GetPaymentsListRequest['query']>
>;

export default interface IPaymentController {
  createPayment: CreatePayment;
  getPayment: GetPayment;
  getPaymentList: GetPaymentList;
}
