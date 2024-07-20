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

export type TransactionResponseCallback = ExpressHandlerWithParams<
  { orderId: string },
  unknown,
  unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;

export type TransactionProcessedCallback = ExpressHandlerWithParams<
  { orderId?: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  unknown,
  { hmac: string }
>;

export default interface IPaymentController {
  getPayment: GetPayment;
  getPaymentList: GetPaymentList;
  transactionResponseCallback: TransactionResponseCallback;
  transactionProcessedCallback: TransactionProcessedCallback;
}
