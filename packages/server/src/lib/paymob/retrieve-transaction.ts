import { axiosInstance } from './axiosInstance.js';

interface TransactionResponse {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: { [key: string]: any };
}

/**
 * Retrieve a transaction by its ID
 *
 * @returns {Promise<TransactionResponse>}
 *
 * @see https://docs.paymob.com/docs/retrieve-a-transaction#inquire-with-the-transaction-id
 */
export const retrieveTransactionById = async ({
  transaction_id,
  token,
}: {
  token: string;
  transaction_id: number;
}): Promise<TransactionResponse> => {
  try {
    const response = await axiosInstance.get<TransactionResponse>(
      `/acceptance/payments/${transaction_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve transaction with Paymob API');
  }
};

/**
 * Retrieve a transaction by the order details
 *
 * @param orderInfo The order details
 * @returns {Promise<TransactionResponse>} The transaction details
 *
 * @see https://docs.paymob.com/docs/retrieve-a-transaction#inquire-with-the-related-order-details
 */
export const retrieveTransactionByOrderDetails = async (orderInfo: {
  auth_token: string;
  merchant_order_id: number;
  order_id: number;
}): Promise<TransactionResponse> => {
  try {
    const response = await axiosInstance.post<TransactionResponse>(
      `/ecommerce/orders/transaction_inquiry`,
      orderInfo
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve transaction with Paymob API');
  }
};
