import { configuration } from '@/configuration';
import { orderService, stockService } from '@/features';
import { PaymobAdapter } from '@/infrastructure/payment-provider';
import { createHmac } from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifyHmacSignature = async (hmac: string, transaction: any) => {
  const lexicographical =
    transaction.amount_cents.toString() +
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
    transaction.success.toString();

  const hash = createHmac('sha512', process.env.PAYMOB_HMAC_KEY!)
    .update(lexicographical)
    .digest('hex');

  return hash.toLowerCase() === hmac.toLowerCase();
};

const postOrderHandler = async (
  orderId: string,
  hmac: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transaction: any
): Promise<boolean> => {
  const verified = await verifyHmacSignature(hmac, transaction);

  // 1. update order status
  const paymob = new PaymobAdapter(configuration());
  const { status } = await paymob.retrieve(transaction.id);

  const { orderItems } = await orderService.update(orderId, {
    transactionId: transaction.id.toString(),
    paymentStatus: status!,
  });

  // 2. update stock quantity based on payment status
  if (status === 'PAID') {
    await stockService.decreaseQuantity(
      orderItems.map(item => ({ stockId: item.stockId, quantity: item.quantity }))
    );
  } else if (status === 'REFUNDED' || status === 'VOIDED') {
    await stockService.increaseQuantity(
      orderItems.map(item => ({ stockId: item.stockId, quantity: item.quantity }))
    );
  }

  return verified;
};

export { postOrderHandler };
