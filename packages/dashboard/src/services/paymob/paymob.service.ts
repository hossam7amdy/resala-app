import type { Configuration } from '@/configuration';
import { HttpClient } from '@/utils/http-client';
import { createHmac } from 'crypto';
import { Decimal } from 'decimal.js';

import type {
  CheckoutCreateParams,
  CheckoutCreateResponse,
  RetrieveTransactionResponse,
  Transaction,
  WebhookParams,
} from './payments.dtos';

export class PaymobService {
  private readonly apiToken: string;
  private readonly secretKey: string;
  private readonly publicKey: string;
  private readonly integrationId: number;
  private readonly httpClient: HttpClient;

  constructor(config: Configuration) {
    this.apiToken = config.payment.paymob.apiToken;
    this.secretKey = config.payment.paymob.secretKey;
    this.integrationId = config.payment.paymob.integrationId;
    this.publicKey = config.payment.paymob.publicKey;

    this.httpClient = new HttpClient({
      baseUrl: config.payment.paymob.baseUrl,
      defaultHeaders: { 'Content-Type': 'application/json' },
    });
  }

  private _constructPaymentLink(clientSecret: string): string {
    return `https://accept.paymob.com/unifiedcheckout/?publicKey=${this.publicKey}&clientSecret=${clientSecret}`;
  }

  private _verifyHmacSignature(hmac: string, transaction: Transaction): boolean {
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

    return hash === hmac;
  }

  private _parseTransactionStatus(transaction: Transaction) {
    if (transaction.is_voided) return 'VOIDED';
    if (transaction.is_refunded) return 'REFUNDED';
    if (transaction.error_occured) return 'FAILED';
    if (transaction.success) return 'PAID';
    if (transaction.pending) return 'UNPAID';
  }

  private async _authenticate(): Promise<{ token: string }> {
    const body = {
      api_key: this.apiToken,
    };

    const { token } = await this.httpClient.post<{ token: string }>('/api/auth/tokens', body);

    return { token };
  }

  async checkout(payload: CheckoutCreateParams): Promise<CheckoutCreateResponse> {
    const headers = {
      Authorization: `Token ${this.secretKey}`,
    };

    const body: CheckoutCreateParams = {
      currency: 'EGP',
      amount: new Decimal(payload.amount).mul(100).toDecimalPlaces(2).toNumber(),
      redirection_url: payload?.redirection_url,
      notification_url: payload?.notification_url,
      payment_methods: [this.integrationId],
      items: payload.items.map(item => ({
        name: item.name,
        amount: new Decimal(item.amount).mul(100).toDecimalPlaces(2).toNumber(),
        quantity: item.quantity,
        description: item.description,
      })),
      billing_data: {
        first_name: payload.billing_data.first_name,
        last_name: payload.billing_data.last_name,
        email: payload.billing_data.email,
        phone_number: payload.billing_data.phone_number,
        country: payload.billing_data.country,
        state: payload.billing_data.state,
        city: payload.billing_data.city,
        street: payload.billing_data.street || 'NA',
        building: payload.billing_data.building || 'NA',
        floor: payload.billing_data.floor || 'NA',
        apartment: payload.billing_data.apartment || 'NA',
      },
    };

    const { client_secret: clientSecret } = await this.httpClient.post<{ client_secret: string }>(
      '/v1/intention/',
      body,
      { headers }
    );

    return { paymentLink: this._constructPaymentLink(clientSecret) };
  }

  async retrieve(trxId: number): Promise<RetrieveTransactionResponse> {
    const { token } = await this._authenticate();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.httpClient.get(`/api/acceptance/transactions/${trxId}`, {
      headers,
    });
  }

  async void(trxId: number): Promise<void> {
    const { token } = await this._authenticate();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      transaction_id: trxId,
    };

    await this.httpClient.post('/api/acceptance/void_refund/void', body, { headers });
  }

  async refund(trxId: number, amount: number): Promise<void> {
    const headers = {
      Authorization: `Token ${this.secretKey}`,
    };

    const body = {
      transaction_id: trxId,
      amount_cents: new Decimal(amount).mul(100).toDecimalPlaces(2).toNumber(),
    };

    await this.httpClient.post('/api/acceptance/void_refund/refund', body, {
      headers,
    });
  }

  async handleWebhookCallback(data: WebhookParams): Promise<{
    status: 'PAID' | 'UNPAID' | 'VOIDED' | 'REFUNDED' | 'FAILED' | undefined;
    verified: boolean;
  }> {
    const { hmac, transaction } = data;

    const isValid = this._verifyHmacSignature(hmac, transaction);
    const status = this._parseTransactionStatus(transaction);

    return Promise.resolve({ status, verified: isValid });
  }
}
