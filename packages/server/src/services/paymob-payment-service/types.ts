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

export interface ResponseCallbackObject {
  id: string;
  pending: string;
  amount_cents: string;
  success: string;
  is_auth: string;
  is_capture: string;
  is_standalone_payment: string;
  is_voided: string;
  is_refunded: string;
  is_3d_secure: string;
  integration_id: string;
  profile_id: string;
  has_parent_transaction: string;
  order: string;
  created_at: string;
  currency: string;
  merchant_commission: string;
  discount_details: string;
  is_void: string;
  is_refund: string;
  error_occured: string;
  refunded_amount_cents: string;
  captured_amount: string;
  updated_at: string;
  is_settled: string;
  bill_balanced: string;
  is_bill: string;
  owner: string;
  'data.message': string;
  'source_data.type': string;
  'source_data.pan': string;
  'source_data.sub_type': string;
  acq_response_code: string;
  txn_response_code: string;
}

export interface ProcessedCallbackObject {
  type: string;
  obj: {
    id: number;
    pending: boolean;
    amount_cents: number;
    success: boolean;
    is_auth: boolean;
    is_capture: boolean;
    is_standalone_payment: boolean;
    is_voided: boolean;
    is_refunded: boolean;
    is_3d_secure: boolean;
    integration_id: number;
    profile_id: number;
    has_parent_transaction: boolean;
    order: {
      id: number;
      created_at: string;
      delivery_needed: boolean;
      merchant: {
        id: number;
        created_at: string;
        phones: string[];
        company_emails: string[];
        company_name: string;
        state: string;
        country: string;
        city: string;
        postal_code: string;
        street: string;
      };
      collector: any;
      amount_cents: number;
      shipping_data: {
        id: number;
        first_name: string;
        last_name: string;
        street: string;
        building: string;
        floor: string;
        apartment: string;
        city: string;
        state: string;
        country: string;
        email: string;
        phone_number: string;
        postal_code: string;
        extra_description: string;
        shipping_method: string;
        order_id: number;
        order: number;
      };
      currency: string;
      is_payment_locked: boolean;
      is_return: boolean;
      is_cancel: boolean;
      is_returned: boolean;
      is_canceled: boolean;
      merchant_order_id: string;
      wallet_notification: any;
      paid_amount_cents: number;
      notify_user_with_email: boolean;
      items: {
        name: string;
        amount_cents: number;
        quantity: number;
      }[];
      order_url: string;
      commission_fees: number;
      delivery_fees_cents: number;
      delivery_vat_cents: number;
      payment_method: string;
      merchant_staff_tag: any;
      api_source: string;
      data: Record<string, unknown>;
    };
    created_at: string;
    transaction_processed_callback_responses: any[];
    currency: string;
    source_data: {
      pan: string;
      type: string;
      tenure: any;
      sub_type: string;
    };
    api_source: string;
    terminal_id: any;
    merchant_commission: number;
    installment: any;
    discount_details: any[];
    is_void: boolean;
    is_refund: boolean;
    data: {
      gateway_integration_pk: number;
      klass: string;
      created_at: string;
      amount: number;
      currency: string;
      migs_order: {
        acceptPartialAmount: boolean;
        amount: number;
        creationTime: string;
        currency: string;
        id: string;
        status: string;
        totalAuthorizedAmount: number;
        totalCapturedAmount: number;
        totalRefundedAmount: number;
      };
      merchant: string;
      migs_result: string;
      migs_transaction: {
        acquirer: {
          batch: number;
          date: string;
          id: string;
          merchantId: string;
          settlementDate: string;
          timeZone: string;
          transactionId: string;
        };
        amount: number;
        authorizationCode: string;
        currency: string;
        frequency: string;
        id: string;
        receipt: string;
        source: string;
        terminal: string;
        type: string;
      };
      txn_response_code: string;
      acq_response_code: string;
      message: string;
      merchant_txn_ref: string;
      order_info: string;
      receipt_no: string;
      transaction_no: string;
      batch_no: number;
      authorize_id: string;
      card_type: string;
      card_num: string;
      secure_hash: string;
      avs_result_code: string;
      avs_acq_response_code: string;
      captured_amount: number;
      authorised_amount: number;
      refunded_amount: number;
      acs_eci: string;
    };
    is_hidden: boolean;
    payment_key_claims: {
      exp: number;
      extra: Record<string, unknown>;
      pmk_ip: string;
      user_id: number;
      currency: string;
      order_id: number;
      amount_cents: number;
      billing_data: {
        city: string;
        email: string;
        floor: string;
        state: string;
        street: string;
        country: string;
        building: string;
        apartment: string;
        last_name: string;
        first_name: string;
        postal_code: string;
        phone_number: string;
        extra_description: string;
      };
      integration_id: number;
      lock_order_when_paid: boolean;
      single_payment_attempt: boolean;
    };
    error_occured: boolean;
    is_live: boolean;
    other_endpoint_reference: any;
    refunded_amount_cents: number;
    source_id: number;
    is_captured: boolean;
    captured_amount: number;
    merchant_staff_tag: any;
    updated_at: string;
    is_settled: boolean;
    bill_balanced: boolean;
    is_bill: boolean;
    owner: number;
    parent_transaction: any;
  };
  issuer_bank: any;
  transaction_processed_callback_responses: string;
}
