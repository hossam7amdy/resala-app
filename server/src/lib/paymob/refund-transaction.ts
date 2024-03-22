import { ENV } from '../../config';

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
  const response = await fetch(`${PAYMOB_API_URL}/acceptance/void_refund/refund`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<RefundTransactionResponse>;
}
