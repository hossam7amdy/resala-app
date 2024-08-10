import type { GetPaymentRequest, GetPaymentResponse } from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams } from '../../types/index.js';

export type GetPayment = ExpressHandlerWithParams<
  GetPaymentRequest['params'],
  undefined,
  GetPaymentResponse
>;

export type VoidPayment = ExpressHandler;

export type RefundPayment = ExpressHandler;

export type PostPayCallback = ExpressHandlerWithParams<
  { orderId?: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  unknown,
  unknown
>;

export default interface IPaymentController {
  getPayment: GetPayment;
  voidPayment: VoidPayment;
  refundPayment: RefundPayment;
  postPayCallback: PostPayCallback;
}
