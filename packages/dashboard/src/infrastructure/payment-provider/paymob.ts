import type { Configuration } from '@/configuration';
import type { CheckoutParams, PaymentPort, Transaction } from '@/interfaces';
import { HttpClient } from '@/utils/http-client';
import { Decimal } from 'decimal.js';

export class PaymobAdapter implements PaymentPort {
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

  private _parseTransactionStatus(transaction: TransactionDto) {
    if (transaction.is_voided) return 'VOIDED';
    if (transaction.is_refunded) return 'REFUNDED';
    if (transaction.error_occured) return 'FAILED';
    if (transaction.success) return 'PAID';
    if (transaction.pending) return 'UNPAID';
    if (!transaction.success) return 'FAILED';
  }

  private async _authenticate(): Promise<{ token: string }> {
    const body = {
      api_key: this.apiToken,
    };

    const { token } = await this.httpClient.post<{ token: string }>('/api/auth/tokens', body);

    return { token };
  }

  async checkout(payload: CheckoutParams): Promise<string> {
    const headers = {
      Authorization: `Token ${this.secretKey}`,
    };

    const body: CheckoutParamsDto = {
      currency: 'EGP',
      amount: new Decimal(payload.amount).mul(100).toDecimalPlaces(2).toNumber(),
      redirection_url: payload?.redirectionUrl,
      notification_url: payload?.notificationUrl,
      payment_methods: [this.integrationId],
      billing_data: {
        first_name: payload.billingData.firstName,
        last_name: payload.billingData.lastName,
        email: payload.billingData.email,
        phone_number: payload.billingData.phoneNumber,
        country: payload.billingData.country,
        state: payload.billingData.state,
        city: payload.billingData.city,
        street: payload.billingData.street || 'NA',
        building: payload.billingData.building || 'NA',
        floor: payload.billingData.floor || 'NA',
        apartment: payload.billingData.apartment || 'NA',
      },
    };

    const { client_secret: clientSecret } = await this.httpClient.post<{ client_secret: string }>(
      '/v1/intention/',
      body,
      { headers }
    );

    return this._constructPaymentLink(clientSecret);
  }

  async retrieve(trxId: string): Promise<Transaction> {
    const { token } = await this._authenticate();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = await this.httpClient.get<TransactionDto>(
      `/api/acceptance/transactions/${trxId}`,
      { headers }
    );

    return {
      id: data.id,
      currency: data.currency,
      amountCents: data.amount_cents,
      refundedAmountCents: data.refunded_amount_cents,
      status: this._parseTransactionStatus(data)!,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
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

  async refund(trxId: string, amount: number): Promise<void> {
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
}

interface TransactionDto {
  id: number;
  pending: boolean;
  amount_cents: number;
  success: boolean;
  is_auth: boolean;
  is_capture: boolean;
  is_standalone_payment: boolean;
  is_voided: boolean;
  is_refunded: boolean;
  is_3d_secure: boolean;
  integration_id: number;
  profile_id: number;
  has_parent_transaction: boolean;
  created_at: string;
  updated_at: string;
  currency: string;
  is_void: boolean;
  is_refund: boolean;
  is_hidden: boolean;
  error_occured: boolean;
  is_live: boolean;
  refunded_amount_cents: number | null;
  is_captured: boolean;
  captured_amount: number | null;
  is_settled: boolean;
  owner: number;
  unique_ref: string;
  parent_transaction: number | null;
}

interface CheckoutParamsDto {
  amount: number;
  currency: string;
  billing_data: {
    apartment: string;
    first_name: string;
    last_name: string;
    street: string;
    building: string;
    phone_number: string;
    city: string;
    country: string;
    email: string;
    floor: string;
    state: string;
  };
  expiration?: number;
  payment_methods: number[];
  notification_url?: string;
  redirection_url?: string;
}
