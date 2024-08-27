import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { Decimal } from 'decimal.js';

import type { AuthenticateApiResponse, CheckoutApiResponse, CheckoutDto } from './payments.dtos.js';

export class PaymobService {
  private readonly api: AxiosInstance;
  private readonly serverUrl = process.env.SERVER_URL;
  private readonly webUrl = process.env.WEB_APP_URL;
  private readonly baseURL = 'https://accept.paymob.com';
  private readonly apiToken = process.env.PAYMOB_API_TOKEN;
  private readonly secretKey = process.env.PAYMOB_SECRET_KEY;
  private readonly publicKey = process.env.PAYMOB_PUBLIC_KEY;
  private readonly integrationId = +process.env.PAYMOB_INTEGRATION_ID;
  private readonly checkoutLink = `https://accept.paymob.com/unifiedcheckout/?publicKey=${this.publicKey}`;

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        throw error.response.data ?? error.response ?? error;
      }
    );
  }

  async authenticate(): Promise<{ token: string }> {
    const body = {
      api_key: this.apiToken,
    };

    const { token } = await this.api.post<unknown, AuthenticateApiResponse>(
      '/api/auth/tokens',
      body
    );

    return { token };
  }

  async checkout({
    user,
    order,
    shipping,
    items,
  }: CheckoutDto): Promise<{ payment_link: string } & CheckoutApiResponse> {
    const headers = {
      Authorization: `Token ${this.secretKey}`,
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
      redirection_url: `${this.serverUrl}/post_pay/${order.id}/`,
      notification_url: `${this.webUrl}/post_pay/${order.id}/`,
      payment_methods: [this.integrationId],
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

    const payment_link = this.getCheckoutLink(client_secret);

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
      Authorization: `Token ${this.secretKey}`,
    };

    const body = {
      transaction_id: trxId,
      amount_cents: amountCents,
    };

    return await this.api.post('/api/acceptance/void_refund/refund', body, {
      headers,
    });
  }

  private getCheckoutLink(clientSecret: string) {
    return `${this.checkoutLink}&clientSecret=${clientSecret}`;
  }
}
