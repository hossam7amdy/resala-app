import { axiosInstance } from './axiosInstance.js';

interface RefundTransactionRequest {
  auth_token: string;
  transaction_id: number;
  amount_cents: number;
}

interface RefundTransactionResponse {
  type: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export const refundTransaction = async (
  payload: RefundTransactionRequest
): Promise<RefundTransactionResponse> => {
  try {
    const response = await axiosInstance.post<RefundTransactionResponse>(
      '/acceptance/void_refund/refund',
      payload
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to refund transaction with Paymob API');
  }
};
