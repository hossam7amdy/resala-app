import { ENV } from '../../config';
import Fetch from '../../utils/fetch';

const PAYMOB_API_URL = ENV.PAYMOB_API_URL;

interface VoidTransactionRequest {
  access_token: string;
  transaction_id: number;
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
  try {
    const response = await Fetch.post(
      `${PAYMOB_API_URL}/acceptance/void_refund/void?token=${payload.access_token}`,
      { transaction_id: payload.transaction_id }
    );

    return response as Promise<VoidTransactionResponse>;
  } catch (error) {
    throw new Error('Failed to void transaction with Paymob API');
  }
}
