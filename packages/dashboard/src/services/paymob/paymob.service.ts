/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: remove this 👆 after implementing the service
import type { Configuration } from '@/configuration';
import { HttpClient } from '@/utils/http-client';
import { Decimal } from 'decimal.js';

import type { AuthenticateApiResponse, CheckoutApiResponse, CheckoutDto } from './payments.dtos';

export class PaymobService {
  private readonly serverUrl: string;
  private readonly webUrl: string;
  private readonly apiToken: string;
  private readonly secretKey: string;
  private readonly integrationId: number;
  private readonly checkoutLink: string;
  private readonly httpClient: HttpClient;

  constructor(config: Configuration) {
    this.webUrl = config.origin.web;
    this.serverUrl = config.server.url;
    this.apiToken = config.payment.paymob.apiToken;
    this.secretKey = config.payment.paymob.secretKey;
    this.integrationId = config.payment.paymob.integrationId;
    this.checkoutLink = config.payment.paymob.checkoutLink;

    this.httpClient = new HttpClient({
      baseUrl: config.payment.paymob.baseUrl,
      defaultHeaders: { 'Content-Type': 'application/json' },
    });
  }

  async authenticate(): Promise<{ token: string }> {
    const body = {
      api_key: this.apiToken,
    };

    const { token } = await this.httpClient.post<AuthenticateApiResponse>('/api/auth/tokens', {
      body,
    });

    return { token };
  }

  async checkout({
    user,
    order,
    shipping,
    cart,
  }: CheckoutDto): Promise<{ payment_link: string } & CheckoutApiResponse> {
    const headers = {
      Authorization: `Token ${this.secretKey}`,
    };

    const orderItems = [
      {
        name: 'Resala cart items',
        amount: cart.totalPrice * 100,
        description: `Purchasing for ${cart.totalQuantity} items`,
        quantity: 1,
      },
      {
        name: 'Shipping',
        amount: +order.shipping * 100,
        description: 'Shipping fees',
        quantity: 1,
      },
    ];

    const body = {
      currency: 'EGP',
      amount: new Decimal(order.total).mul(100).toDecimalPlaces(2).toNumber(),
      redirection_url: `${this.webUrl}/post_pay/${order.id}/`,
      notification_url: `${this.serverUrl}/post_pay/${order.id}/`,
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

    const { client_secret, ...rest } = await this.httpClient.post<CheckoutApiResponse>(
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

    return this.httpClient.get(`/api/acceptance/transactions/${trxId}`, {
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

    return await this.httpClient.post('/api/acceptance/void_refund/void', body, { headers });
  }

  async refund(trxId: number, amountCents: number): Promise<any> {
    const headers = {
      Authorization: `Token ${this.secretKey}`,
    };

    const body = {
      transaction_id: trxId,
      amount_cents: amountCents,
    };

    return await this.httpClient.post('/api/acceptance/void_refund/refund', body, {
      headers,
    });
  }

  private getCheckoutLink(clientSecret: string) {
    return `${this.checkoutLink}&clientSecret=${clientSecret}`;
  }
}
