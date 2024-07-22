/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Address, Order, OrderItem, User } from '@resala/shared';

export interface CheckoutDto {
  user: User;
  order: Order & { shipping: number };
  shipping: Omit<Address, 'id'>;
  items: Omit<OrderItem, 'id' | 'createdAt' | 'updatedAt'>[];
}

export interface AuthenticateApiResponse {
  token: string;
}

export interface CheckoutApiResponse {
  client_secret: string;
  special_reference: string;
  extras: {
    [key: string]: any;
  };
  confirmed: boolean;
  status: string;
  created: string;
  card_detail: string;
  object: string;
  [key: string]: any;
}

export interface VerifyDto {
  amount_cents: string;
  created_at: string;
  currency: string;
  error_occured: string;
  has_parent_transaction: string;
  id: string;
  integration_id: string;
  is_3d_secure: string;
  is_auth: string;
  is_capture: string;
  is_refunded: string;
  is_standalone_payment: string;
  is_voided: string;
  orderId: string;
  owner: string;
  pending: string;
  sourceDataPan: string;
  sourceDataSubType: string;
  sourceDataType: string;
  success: string;
}

type IntentionDetailItem = {
  name: string;
  amount: number;
  description: string;
  quantity: number;
};

type IntentionDetail = {
  amount: number;
  items: IntentionDetailItem[];
  currency: string;
};

type PaymentMethod = {
  integration_id: number;
  alias: any | null;
  name: string;
  method_type: string;
  currency: string;
  live: boolean;
  use_cvc_with_moto: boolean;
};

type Extras = {
  creation_extras: any | null;
  confirmation_extras: any | null;
};

type Intention = {
  id: string;
  intention_detail: IntentionDetail;
  client_secret: string;
  payment_methods: PaymentMethod[];
  special_reference: any | null;
  extras: Extras;
  confirmed: boolean;
  status: string;
  created: string;
  card_detail: any | null;
  card_tokens: any[];
  object: string;
};

type TransactionOrder = {
  id: number;
};

type SourceData = {
  pan: string;
  sub_type: string;
  type: string;
};

type Transaction = {
  amount_cents: number;
  created_at: string;
  currency: string;
  error_occured: boolean;
  has_parent_transaction: boolean;
  id: number;
  integration_id: number;
  is_3d_secure: boolean;
  is_auth: boolean;
  is_capture: boolean;
  is_refunded: boolean;
  is_standalone_payment: boolean;
  is_voided: boolean;
  order: TransactionOrder;
  owner: number;
  pending: boolean;
  source_data: SourceData;
  success: boolean;
  receipt: string;
};

export type PostPayCallbackObject = {
  paymob_request_id: any | null;
  intention: Intention;
  hmac: string;
  transaction: Transaction;
};
