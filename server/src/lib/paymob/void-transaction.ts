import { ENV } from '../../config';

const PAYMOB_API_URL = ENV.PAYMOB_API_URL;

interface VoidTransactionRequest {
  access_token: string;
  transaction_id: string;
}

interface VoidTransactionResponse {
  success: boolean;
  data: { [key: string]: any };
}

/**
 * @description A void transaction is a reverse transaction, which could
 * be performed to cancel a transaction that occurred within the same business
 * day without any transaction fees. You can void any of your transactions
 * from your Accept dashboard from the void button found in the transaction details.
 *
 * @param payload The void transaction payload details
 * @returns {Promise<VoidTransactionResponse>}
 *
 * @see https://docs.paymob.com/docs/void-transaction
 */
export async function voidTransaction(
  payload: VoidTransactionRequest
): Promise<VoidTransactionResponse> {
  const response = await fetch(
    `${PAYMOB_API_URL}/acceptance/void_refund/void?token=${payload.access_token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_id: payload.transaction_id,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<VoidTransactionResponse>;
}
