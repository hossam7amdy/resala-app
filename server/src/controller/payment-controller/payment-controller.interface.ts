import type {
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetPaymentRequest,
  GetPaymentResponse,
  GetPaymentsListRequest,
  GetPaymentsListResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams } from '../../types/index.js';

export interface CreatePayment
  extends ExpressHandler<
    CreatePaymentRequest['body'],
    CreatePaymentResponse,
    CreatePaymentRequest['query']
  > {}

export interface GetPayment
  extends ExpressHandlerWithParams<GetPaymentRequest['params'], {}, GetPaymentResponse> {}

export interface GetPaymentList
  extends ExpressHandler<{}, GetPaymentsListResponse, Required<GetPaymentsListRequest['query']>> {}
