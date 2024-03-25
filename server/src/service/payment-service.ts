import { Address } from '@prisma/client';

import { orderService } from '.';
import { paymob } from '../lib/paymob';
import callback from '../lib/paymob/callback.json';
import { prisma } from '../model';

export async function createPayment(payload: {
  email: string;
  orderId: number;
  amount: number;
  items: any[];
  shipping: Address;
}) {
  const { token } = await paymob.authenticate();

  const { id } = await paymob.createOrder({
    auth_token: token,
    delivery_needed: false,
    amount_cents: payload.amount * 100,
    items: payload.items,
    merchant_order_id: payload.orderId,
  });

  return await paymob.checkout({
    order_id: id,
    auth_token: token,
    billing_data: {
      first_name: payload.shipping.firstName,
      last_name: payload.shipping.lastName,
      email: payload.email,
      phone_number: payload.shipping.phone,
      country: payload.shipping.country,
      state: payload.shipping.state,
      city: payload.shipping.city,
      street: payload.shipping.street || payload.shipping.address || 'NA',
      building: payload.shipping.building || 'NA',
      floor: `${payload.shipping.floor}` || 'NA',
      apartment: 'NA',
      postal_code: 'NA',
      shipping_method: 'COURIER',
    },
    expiration: 3600,
    amount_cents: payload.amount,
    lock_order_when_paid: true,
  });
}

export async function retrievePayment(transactionId: number) {
  const { token } = await paymob.authenticate();

  return await paymob.retrieveTransactionById({
    transaction_id: transactionId,
    token,
  });
}

export async function voidPayment(transactionId: number) {
  const { token } = await paymob.authenticate();

  return await paymob.voidTransaction({
    transaction_id: transactionId,
    access_token: token,
  });
}

export async function refundPayment(transactionId: number, amount: number) {
  const { token } = await paymob.authenticate();

  return await paymob.refundTransaction({
    transaction_id: transactionId,
    amount_cents: amount * 100,
    auth_token: token,
  });
}

export async function authenticatePaymentCallback(hmac: string, body: typeof callback) {
  const authenticated = await paymob.authenticateCallback(hmac, body.obj);

  console.log('Authenticating payment callback', hmac, body, authenticated);

  await prisma.payment.create({
    data: {
      orderId: body.obj.order.merchant.id,
      transactionId: body.obj.id,
      transactionOrderId: body.obj.order.id,
      pending: body.obj.pending,
      success: body.obj.success,
      isAuth: body.obj.is_auth,
      isVoided: body.obj.is_voided,
      isCapture: body.obj.is_capture,
      isRefunded: body.obj.is_refunded,
      is3DSecure: body.obj.is_3d_secure,
      integrationId: body.obj.integration_id,
      deliveryNeeded: body.obj.order.delivery_needed,
      amountCents: body.obj.amount_cents,
      currency: body.obj.currency,
      createdAt: new Date(body.obj.created_at),
    },
  });

  await orderService.updateOrder(body.obj.order.merchant.id, {
    paymentStatus: getPaymentStatus(body.obj),
  });

  return true;
}

function getPaymentStatus(obj: (typeof callback)['obj']) {
  if (obj.success) {
    return 'PAID';
  } else if (obj.pending) {
    return 'PENDING';
  } else if (obj.is_voided) {
    return 'VOIDED';
  } else if (obj.is_refunded) {
    return 'REFUNDED';
  } else {
    return 'FAILED';
  }
}
