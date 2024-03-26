import { ENV } from '../../config';
import { fetch } from '../../utils/fetch';

const PAYMOB_API_URL = ENV.PAYMOB_API_URL;

interface TransactionResponse {
  type: string;
  obj: { [key: string]: any };
}

/**
 * Retrieve a transaction by its ID
 *
 * @returns {Promise<TransactionResponse>}
 *
 * @see https://docs.paymob.com/docs/retrieve-a-transaction#inquire-with-the-transaction-id
 */
export async function retrieveTransactionById({
  transaction_id,
  token,
}: {
  token: string;
  transaction_id: number;
}): Promise<TransactionResponse> {
  try {
    const response = await fetch.get(`${PAYMOB_API_URL}/acceptance/payments/${transaction_id}`, {
      Authorization: `Bearer ${token}`,
    });

    return response as TransactionResponse;
  } catch (error) {
    throw new Error('Failed to retrieve transaction with Paymob API');
  }
}

/**
 * Retrieve a transaction by the order details
 *
 * @param orderInfo The order details
 * @returns {Promise<TransactionResponse>} The transaction details
 *
 * @see https://docs.paymob.com/docs/retrieve-a-transaction#inquire-with-the-related-order-details
 */
export async function retrieveTransactionByOrderDetails(orderInfo: {
  auth_token: string;
  merchant_order_id: number;
  order_id: number;
}): Promise<TransactionResponse> {
  try {
    const response = await fetch.post(
      `${PAYMOB_API_URL}/ecommerce/orders/transaction_inquiry`,
      orderInfo
    );

    return response as TransactionResponse;
  } catch (error) {
    throw new Error('Failed to retrieve transaction with Paymob API');
  }
}
