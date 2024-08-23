type SourceData = {
  type: string;
  pan: string;
  sub_type: string;
};

export type PostProcessedBodyDTO = {
  paymob_request_id: string | null;
  intention: {
    id: string;
    intention_detail: {
      amount: number;
      items: {
        name: string;
        amount: number;
        description: string;
        quantity: number;
        image: string | null;
      }[];
      currency: string;
      billing_data: {
        apartment: string;
        floor: string;
        first_name: string;
        last_name: string;
        street: string;
        building: string;
        phone_number: string;
        shipping_method: string;
        city: string;
        country: string;
        state: string;
        email: string;
        postal_code: string;
      };
    };
    client_secret: string;
    payment_methods: {
      integration_id: number;
      alias: string | null;
      name: string;
      method_type: string;
      currency: string;
      live: boolean;
      use_cvc_with_moto: boolean;
    }[];
    special_reference: string | null;
    extras: {
      creation_extras: any;
      confirmation_extras: any;
    };
    confirmed: boolean;
    status: string;
    created: string;
    card_detail: any | null;
    card_tokens: any[];
    object: string;
  };
  hmac: string;
  transaction: {
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
    order: {
      id: number;
    };
    owner: number;
    pending: boolean;
    source_data: SourceData;
    success: boolean;
    receipt: string;
  };
};

export type PostRedirectQueryDTO = {
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
  order: number;
  created_at: string;
  currency: string;
  merchant_commission: number;
  discount_details: any[];
  is_void: boolean;
  is_refund: boolean;
  error_occured: boolean;
  refunded_amount_cents: number;
  captured_amount: number;
  updated_at: string;
  is_settled: boolean;
  bill_balanced: boolean;
  is_bill: boolean;
  owner: number;
  data: {
    message: string;
  };
  source_data: SourceData;
  acq_response_code: string;
  txn_response_code: string;
  hmac: string;
};
