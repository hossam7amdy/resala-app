import { ENV } from '../../config';

const CURRENCY = 'EGP';
const PAYMOB_API_URL = ENV.PAYMOB_API_URL;
const PAYMOB_INTEGRATION_ID = ENV.PAYMOB_INTEGRATION_ID;

interface BillingData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  city: string;
  street: string;
  building: string | 'NA';
  floor: string | 'NA';
  apartment: string | 'NA';
  postal_code: string | 'NA';
  shipping_method: 'PICKUP' | 'COURIER';
}
interface CheckoutRequest {
  auth_token: string;
  amount_cents: number;
  expiration: number;
  order_id: number;
  billing_data: BillingData;
  lock_order_when_paid?: boolean;
}

interface CheckoutResponse {
  token: string;
  iframeUrl: string;
}

/**
 * Checkout the order and obtain a **payment_key token**. This key will be used to authenticate
 * your payment request. It will be also used for verifying your transaction request metadata.
 *
 * @param payload The order payload details
 * @returns {Promise<CheckoutResponse>}
 *
 * @see https://docs.paymob.com/docs/accept-standard-redirect#3-payment-key-request
 */
export async function checkout(payload: CheckoutRequest): Promise<CheckoutResponse> {
  const response = await fetch(`${PAYMOB_API_URL}/acceptance/payment_keys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      currency: CURRENCY,
      integration_id: PAYMOB_INTEGRATION_ID,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { token } = (await response.json()) as { token: string };
  const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/726054?payment_token=${token}`;

  return {
    token,
    iframeUrl,
  };
}
