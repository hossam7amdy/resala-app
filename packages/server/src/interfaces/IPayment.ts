export default interface PaymentService {
  initialize(config: Record<string, string>): void;
  processPayment(
    amount: number,
    currency: string,
    paymentMethodDetails: Record<string, string>
  ): Promise<void>;
  processRefund(transactionId: string, amount: number): Promise<void>;
  validatePaymentMethod(paymentMethodDetails: Record<string, string>): boolean;
  getPaymentStatus(transactionId: string): Promise<string>;
  cancelPayment(transactionId: string): Promise<void>;
}
