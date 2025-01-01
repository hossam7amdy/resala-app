export interface PaymentPort {
  /**
   * Initiates a checkout session.
   * @param payload - The checkout parameters.
   * @returns A promise that resolves with the checkout URL.
   * @throws {Error} If the checkout fails.
   */
  checkout(payload: CheckoutParams): Promise<string>;

  /**
   * Retrieves a transaction.
   * @param trxId - The transaction ID.
   * @returns A promise that resolves with the transaction details.
   * @throws {Error} If the transaction is not found.
   */
  retrieve(trxId: string): Promise<Transaction>;

  /**
   * Voids a transaction.
   * @param trxId - The transaction ID.
   * @returns A promise that resolves when the transaction is voided.
   * @throws {Error} If the transaction is not found.
   */
  void(trxId: number): Promise<void>;

  /**
   * Refunds a transaction.
   * @param trxId - The transaction ID.
   * @param amount - The amount to refund.
   * @returns A promise that resolves when the transaction is refunded.
   * @throws {Error} If the transaction is not found.
   */
  refund(trxId: string, amount: number): Promise<void>;
}

export interface CheckoutParams {
  amount: number;
  currency: 'EGP';
  paymentMethods?: number[];
  billingData: {
    apartment: string;
    firstName: string;
    lastName: string;
    street: string;
    building: string;
    phoneNumber: string;
    city: string;
    country: string;
    email: string;
    floor: string;
    state: string;
  };
  expiration?: number;
  notificationUrl?: string;
  redirectionUrl?: string;
}

export interface Transaction {
  id: number;
  amountCents: number;
  refundedAmountCents: number | null;
  status: 'UNPAID' | 'PAID' | 'REFUNDED' | 'VOIDED' | 'FAILED';
  createdAt: string;
  currency: string;
  updatedAt: string;
}
