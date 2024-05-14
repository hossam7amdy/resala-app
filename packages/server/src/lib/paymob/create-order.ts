import { ENV } from '../../config/index.js';
import Fetch from '../../utils/fetch.js';

const CURRENCY = 'EGP';
const PAYMOB_API_URL = ENV.PAYMOB_API_URL;

interface CreateOrderRequest {
  auth_token: string;
  delivery_needed: boolean;
  amount_cents: number;
  merchant_order_id: number;
  items: any[];
  shipping_data?: any;
  shipping_details?: any;
}

interface CreateOrderResponse extends Record<string, any> {
  id: number;
}

/**
 * Registers an order to Accept's database, so that you can pay for it later using a transaction
 *
 * Order ID will be the identifier that you will use to link the transaction(s) performed to your system,
 * as one order can have more than one transaction.
 *
 * @param order The order details
 * @returns {Promise<CreateOrderResponse>} The created order
 *
 * @see https://docs.paymob.com/docs/accept-standard-redirect#2-order-registration-api
 */
export async function createOrder(order: CreateOrderRequest): Promise<CreateOrderResponse> {
  try {
    const response = await Fetch.post(`${PAYMOB_API_URL}/ecommerce/orders`, {
      ...order,
      currency: CURRENCY,
    });

    return response as CreateOrderResponse;
  } catch (error) {
    throw new Error('Failed to create order with Paymob API');
  }
}
