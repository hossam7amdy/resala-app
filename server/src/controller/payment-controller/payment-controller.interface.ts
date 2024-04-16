import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetPaymentRequest,
  GetPaymentResponse,
  GetPaymentsListRequest,
  GetPaymentsListResponse,
} from '@resala/shared';

import { ExpressHandler, ExpressHandlerWithParams } from '../../types';

export interface CreatePayment
  extends ExpressHandler<
    CreatePaymentRequest['body'],
    CreatePaymentResponse,
    CreatePaymentRequest['query']
  > {}

export interface GetPayment
  extends ExpressHandlerWithParams<GetPaymentRequest['param'], {}, GetPaymentResponse> {}

export interface GetPaymentList
  extends ExpressHandler<{}, GetPaymentsListResponse, GetPaymentsListRequest['query']> {}
