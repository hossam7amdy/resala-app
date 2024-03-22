import { createHmac } from 'crypto';

import { ENV } from '../../config';

/**
 * Authenticate the request from Paymob
 *
 * @param hmac The HMAC sent by Paymob
 * @param bodyObj The body object sent by Paymob
 * @returns {boolean} True if the request is authentic, false otherwise
 *
 * @see https://docs.paymob.com/docs/hmac-calculation
 */
export function authenticateCallback(hmac: string, bodyObj: { [key: string]: any }): boolean {
  const lexicographical =
    bodyObj.amount_cents +
    bodyObj.created_at +
    bodyObj.currency +
    bodyObj.error_occured +
    bodyObj.has_parent_transaction +
    bodyObj.obj.id +
    bodyObj.integration_id +
    bodyObj.is_3d_secure +
    bodyObj.is_auth +
    bodyObj.is_capture +
    bodyObj.is_refunded +
    bodyObj.is_standalone_payment +
    bodyObj.is_voided +
    bodyObj.order.id +
    bodyObj.owner +
    bodyObj.pending +
    bodyObj.source_data.pan +
    bodyObj.source_data.sub_type +
    bodyObj.source_data.type +
    bodyObj.success;

  // Create a hash using the lexogragical string and the HMAC key
  const hash = createHmac('sha512', ENV.PAYMOB_HMAC_KEY!).update(lexicographical).digest('hex');

  // Compare the hash with the hmac sent by Paymob to verify the request is authentic
  return hash === hmac;
}
