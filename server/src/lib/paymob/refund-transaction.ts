import { ENV } from '../../config';
import { fetch } from '../../utils/fetch';

const PAYMOB_API_URL = ENV.PAYMOB_API_URL;

interface RefundTransactionRequest {
  auth_token: string;
  transaction_id: number;
  amount_cents: number;
}

interface RefundTransactionResponse {
  type: boolean;
  obj: { [key: string]: any };
}

/**
 * Refund a transaction by its ID
 *
 * **Make sure that you have enough balance before performing any reverse transaction "Void/Refund".**
 *
 * @param payload The refund payload details
 * @returns {Promise<RefundTransactionResponse>}
 *
 * @see https://docs.paymob.com/docs/refund-transaction
 */
export async function refundTransaction(
  payload: RefundTransactionRequest
): Promise<RefundTransactionResponse> {
  try {
    const response = await fetch.post(`${PAYMOB_API_URL}/acceptance/void_refund/refund`, payload);

    return response as RefundTransactionResponse;
  } catch (error) {
    throw new Error('Failed to refund transaction with Paymob API');
  }
}
