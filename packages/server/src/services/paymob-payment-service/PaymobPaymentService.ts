/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { createHmac } from 'crypto';
import { Decimal } from 'decimal.js';

import type {
  AuthenticateApiResponse,
  CheckoutApiResponse,
  CheckoutDto,
  PostPayCallbackObject,
} from './types.js';

export default class PaymobPaymentService {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.PAYMOB_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        throw error.response.data;
      }
    );
  }

  async authenticate(): Promise<{ token: string }> {
    const body = {
      api_key: process.env.PAYMOB_API_TOKEN,
    };

    const { token } = await this.api.post<unknown, AuthenticateApiResponse>(
      '/api/auth/tokens',
      body
    );

    return { token };
  }

  async verify({ hmac, transaction }: PostPayCallbackObject): Promise<void> {
    return new Promise((resolve, reject) => {
      const lexicographical =
        transaction.amount_cents +
        transaction.created_at +
        transaction.currency +
        transaction.error_occured +
        transaction.has_parent_transaction +
        transaction.id +
        transaction.integration_id +
        transaction.is_3d_secure +
        transaction.is_auth +
        transaction.is_capture +
        transaction.is_refunded +
        transaction.is_standalone_payment +
        transaction.is_voided +
        transaction.order.id +
        transaction.owner +
        transaction.pending +
        transaction.source_data.pan +
        transaction.source_data.sub_type +
        transaction.source_data.type +
        transaction.success;

      const hash = createHmac('sha512', process.env.PAYMOB_HMAC_KEY!)
        .update(lexicographical)
        .digest('hex');

      return hash === hmac ? resolve() : reject("HMAC doesn't match");
    });
  }

  async checkout({
    user,
    order,
    shipping,
    items,
  }: CheckoutDto): Promise<{ payment_link: string } & CheckoutApiResponse> {
    const headers = {
      Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
    };

    const orderItems = items.map(item => ({
      name: item.name,
      amount: +item.price * 100,
      description: `${item.color}, ${item.size}`,
      quantity: item.quantity,
    }));

    orderItems.push({
      name: 'Shipping',
      amount: +order.shipping * 100,
      description: 'Shipping fees',
      quantity: 1,
    });

    const body = {
      currency: 'EGP',
      amount: new Decimal(order.total).mul(100).toDecimalPlaces(2).toNumber(),
      redirection_url: `${process.env.FRONTEND_URL}`,
      notification_url: `${process.env.SERVER_URL}/post_pay/${order.id}`,
      payment_methods: [+process.env.PAYMOB_INTEGRATION_ID],
      items: orderItems,
      billing_data: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phone,
        country: shipping.country,
        state: shipping.state,
        city: shipping.city,
        street: shipping.street || 'NA',
        building: shipping.building || 'NA',
        floor: shipping.floor || 'NA',
        apartment: shipping.address || 'NA',
      },
      customer: {
        firstName: user.firstName,
        last_name: user.lastName,
        email: user.email,
      },
    };

    const { client_secret, ...rest } = await this.api.post<unknown, CheckoutApiResponse>(
      '/v1/intention/',
      body,
      { headers }
    );

    if (!client_secret) {
      throw new Error('Invalid response from Paymob');
    }

    const payment_link = `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC_KEY}&clientSecret=${client_secret}`;

    return { payment_link, client_secret, ...rest };
  }

  async retrieve(trxId: number): Promise<any> {
    const { token } = await this.authenticate();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.api.get(`/api/acceptance/transactions/${trxId}`, {
      headers,
    });
  }

  async void(trxId: number): Promise<any> {
    const { token } = await this.authenticate();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      transaction_id: trxId,
    };

    return await this.api.post('/api/acceptance/void_refund/void', body, { headers });
  }

  async refund(trxId: number, amountCents: number): Promise<any> {
    const headers = {
      Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
    };

    const body = {
      transaction_id: trxId,
      amount_cents: amountCents,
    };

    return await this.api.post('/api/acceptance/void_refund/refund', body, {
      headers,
    });
  }
}
