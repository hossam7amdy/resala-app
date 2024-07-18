import type {
  GetPaymentRequest,
  GetPaymentResponse,
  GetPaymentsListRequest,
  GetPaymentsListResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams } from '../../types/index.js';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransactionCallback = ExpressHandlerWithParams<{ orderId: string }, any, any, any>;

export default interface IPaymentController {
  getPayment: GetPayment;
  getPaymentList: GetPaymentList;
  transactionResponseCb: TransactionCallback;
  transactionProcessedCb: TransactionCallback;
}
