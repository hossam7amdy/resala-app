import Fetch from '../../utils/fetch.js';

const PAYMOB_API_URL = process.env.PAYMOB_API_URL;

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
    const response = await Fetch.get(`${PAYMOB_API_URL}/acceptance/payments/${transaction_id}`, {
      Authorization: `Bearer ${token}`,
    });

    return response as TransactionResponse;
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
    const response = await Fetch.post(
      `${PAYMOB_API_URL}/ecommerce/orders/transaction_inquiry`,
      orderInfo
    );

    return response as TransactionResponse;
  } catch (error) {
    throw new Error('Failed to retrieve transaction with Paymob API');
  }
};
