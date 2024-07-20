import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { createHmac } from 'crypto';
import { Decimal } from 'decimal.js';

import type {
  AuthenticateApiResponse,
  CheckoutApiResponse,
  CheckoutDto,
  ProcessedCallbackObject,
  VerifyDto,
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

  async verify(hmac: string, verifyDto: VerifyDto): Promise<void> {
    return new Promise((resolve, reject) => {
      const lexicographical =
        verifyDto.amount_cents +
        verifyDto.created_at +
        verifyDto.currency +
        verifyDto.error_occured +
        verifyDto.has_parent_transaction +
        verifyDto.id +
        verifyDto.integration_id +
        verifyDto.is_3d_secure +
        verifyDto.is_auth +
        verifyDto.is_capture +
        verifyDto.is_refunded +
        verifyDto.is_standalone_payment +
        verifyDto.is_voided +
        verifyDto.orderId +
        verifyDto.owner +
        verifyDto.pending +
        verifyDto.sourceDataPan +
        verifyDto.sourceDataSubType +
        verifyDto.sourceDataType +
        verifyDto.success;

      const hash = createHmac('sha512', process.env.PAYMOB_HMAC_KEY!)
        .update(lexicographical)
        .digest('hex');

      return hash === hmac ? resolve() : reject();
    });
  }

  async checkout({ user, order, shipping, items }: CheckoutDto): Promise<{ paymentUrl: string }> {
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
      notification_url: `${process.env.APP_URL}/post_pay/${order.id}`,
      redirection_url: `${process.env.APP_URL}/post_pay/${order.id}`,
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

    const { client_secret } = await this.api.post<unknown, CheckoutApiResponse>(
      '/v1/intention/',
      body,
      { headers }
    );

    if (!client_secret) {
      throw new Error('Invalid response from Paymob');
    }

    const paymentUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC_KEY}&clientSecret=${client_secret}`;

    return { paymentUrl };
  }

  async retrieve(trxId: number): Promise<ProcessedCallbackObject['obj']> {
    const { token } = await this.authenticate();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.api.get(`/api/acceptance/transactions/${trxId}`, {
      headers,
    });
  }

  async void(trxId: number): Promise<ProcessedCallbackObject> {
    const { token } = await this.authenticate();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      transaction_id: trxId,
    };

    return await this.api.post('/api/acceptance/void_refund/void', body, { headers });
  }

  async refund(trxId: number, amount: number): Promise<ProcessedCallbackObject> {
    const headers = {
      Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
    };

    const body = {
      transaction_id: trxId,
      amount_cents: amount * 100,
    };

    return await this.api.post('/api/acceptance/void_refund/refund', body, {
      headers,
    });
  }
}
