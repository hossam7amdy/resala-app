/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Address, GetCartResponse, Order, User } from '@resala/shared';

export interface CheckoutDto {
  user: User;
  order: Order & { shipping: number };
  shipping: Omit<Address, 'id'>;
  cart: GetCartResponse['data'];
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

export interface IntentionDetailItem {
  name: string;
  amount: number;
  description: string;
  quantity: number;
}

export interface IntentionDetail {
  amount: number;
  items: IntentionDetailItem[];
  currency: string;
}

export interface PaymentMethod {
  integration_id: number;
  alias: any | null;
  name: string;
  method_type: string;
  currency: string;
  live: boolean;
  use_cvc_with_moto: boolean;
}

export interface Extras {
  creation_extras: any | null;
  confirmation_extras: any | null;
}

export interface Intention {
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
}

export interface TransactionOrder {
  id: number;
}

export interface SourceData {
  pan: string;
  sub_type: string;
  type: string;
}

export interface Transaction {
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
}

export interface PostPayCallbackObject {
  paymob_request_id: any | null;
  intention: Intention;
  hmac: string;
  transaction: Transaction;
}
