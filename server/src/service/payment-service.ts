import type { Address } from '@prisma/client';

import type callback from '../lib/paymob/callback.json';
import { paymob } from '../lib/paymob/index.js';
import prisma from '../lib/prisma/index.js';
import { NotFoundError } from '../utils/api-errors.js';

export async function createPaymentRequest(payload: {
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

export async function createPayment(hmac: string, payload: (typeof callback)['obj']) {
  const authenticated = await paymob.authenticateCallback(hmac, payload);

  if (!authenticated) {
    throw new Error('Unauthorized request');
  }

  const payment = {
    orderId: Number(payload.order.merchant_order_id),
    transactionId: payload.id,
    transactionOrderId: payload.order.id,
    pending: payload.pending,
    success: payload.success,
    isAuth: payload.is_auth,
    isVoided: payload.is_voided,
    isCapture: payload.is_capture,
    isRefunded: payload.is_refunded,
    is3DSecure: payload.is_3d_secure,
    integrationId: payload.integration_id,
    deliveryNeeded: payload.order.delivery_needed,
    amountCents: payload.amount_cents,
    currency: payload.currency,
    createdAt: new Date(payload.created_at),
  };

  await prisma.payment.upsert({
    create: payment,
    update: payment,
    where: { orderId: payment.orderId },
  });

  return getPaymentStatus(payload);
}

export async function getPayment(paymentId: number) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment) {
    throw new NotFoundError('Payment not found');
  }

  return payment;
}

export async function getPaymentsList({ page, limit }: { limit: number; page: number }) {
  const [total, payments] = await prisma.$transaction([
    prisma.payment.count(),
    prisma.payment.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return {
    total,
    payments,
  };
}

function getPaymentStatus(payment: (typeof callback)['obj']) {
  if (payment.pending) {
    return 'UNPAID';
  } else if (payment.is_voided) {
    return 'VOIDED';
  } else if (payment.is_refunded) {
    return 'REFUNDED';
  } else if (payment.success) {
    return 'PAID';
  } else {
    return 'FAILED';
  }
}
