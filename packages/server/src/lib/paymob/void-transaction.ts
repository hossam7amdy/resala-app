import { axiosInstance } from './axiosInstance.js';

interface VoidTransactionRequest {
  access_token: string;
  transaction_id: number;
}

interface VoidTransactionResponse {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export const voidTransaction = async (
  payload: VoidTransactionRequest
): Promise<VoidTransactionResponse> => {
  try {
    const response = await axiosInstance.post<VoidTransactionResponse>(
      `/acceptance/void_refund/void?token=${payload.access_token}`,
      { transaction_id: payload.transaction_id }
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to void transaction with Paymob API');
  }
};
