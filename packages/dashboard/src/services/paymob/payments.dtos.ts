export interface CheckoutCreateParams {
  amount: number;
  currency: 'EGP';
  payment_methods?: number[];
  items: {
    name: string;
    amount: number;
    description?: string;
    quantity?: number;
  }[];
  billing_data: {
    apartment: string;
    first_name: string;
    last_name: string;
    street: string;
    building: string;
    phone_number: string;
    city: string;
    country: string;
    email: string;
    floor: string;
    state: string;
  };
  extras?: Record<string, unknown>;
  special_reference?: string;
  expiration?: number;
  notification_url?: string;
  redirection_url?: string;
}

export interface CheckoutCreateResponse {
  paymentLink: string;
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
  alias: unknown | null;
  name: string;
  method_type: string;
  currency: string;
  live: boolean;
  use_cvc_with_moto: boolean;
}

export interface Extras {
  creation_extras: unknown | null;
  confirmation_extras: unknown | null;
}

export interface Intention {
  id: string;
  intention_detail: IntentionDetail;
  client_secret: string;
  payment_methods: PaymentMethod[];
  special_reference: unknown | null;
  extras: Extras;
  confirmed: boolean;
  status: string;
  created: string;
  card_detail: unknown | null;
  card_tokens: unknown[];
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

export interface WebhookParams {
  paymob_request_id?: unknown | null;
  intention?: Intention;
  hmac: string;
  transaction: Transaction;
}

export interface RetrieveTransactionResponse {
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
    collector: null;
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
    wallet_notification: null;
    paid_amount_cents: number;
    notify_user_with_email: boolean;
    items: {
      name: string;
      description: string;
      amount_cents: number;
      quantity: number;
    }[];
    order_url: string;
    commission_fees: null;
    delivery_fees_cents: null;
    delivery_vat_cents: null;
    payment_method: string;
    merchant_staff_tag: null;
    api_source: string;
    data: Record<string, unknown>;
  };
  created_at: string;
  transaction_processed_callback_responses: unknown[];
  currency: string;
  source_data: {
    type: string;
    pan: string;
    sub_type: string;
    tenure: null;
  };
  api_source: string;
  terminal_id: null;
  merchant_commission: null;
  installment: null;
  discount_details: unknown[];
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
      authenticationStatus: string;
      chargeback: {
        amount: null;
        currency: string;
      };
      creationTime: string;
      currency: string;
      id: string;
      lastUpdatedTime: string;
      merchantAmount: number;
      merchantCategoryCode: string;
      merchantCurrency: string;
      status: string;
      totalAuthorizedAmount: number;
      totalCapturedAmount: number;
      totalDisbursedAmount: null;
      totalRefundedAmount: null;
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
      authenticationStatus: string;
      authorizationCode: string;
      currency: string;
      id: string;
      receipt: string;
      source: string;
      stan: string;
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
    refunded_amount: null;
    acs_eci: string;
  };
  is_hidden: boolean;
  payment_key_claims: {
    user_id: number;
    amount_cents: number;
    currency: string;
    integration_id: number;
    order_id: number;
    billing_data: {
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
    };
    lock_order_when_paid: boolean;
    extra: Record<string, unknown>;
    notification_url: string;
    redirection_url: string;
    single_payment_attempt: boolean;
    next_payment_intention: string;
    redirect_url: string;
  };
  error_occured: boolean;
  is_live: boolean;
  other_endpoint_reference: null;
  refunded_amount_cents: null;
  source_id: number;
  is_captured: boolean;
  captured_amount: null;
  merchant_staff_tag: null;
  updated_at: string;
  is_settled: boolean;
  bill_balanced: boolean;
  is_bill: boolean;
  owner: number;
  parent_transaction: null;
  unique_ref: string;
}
