import { authenticate } from './authenticate.js';
import { authenticateCallback } from './authenticate-callback.js';
import { checkout } from './checkout.js';
import { createOrder } from './create-order.js';
import { refundTransaction } from './refund-transaction.js';
import { retrieveTransactionById, retrieveTransactionByOrderDetails } from './retrieve-transaction.js';
import { voidTransaction } from './void-transaction.js';

export const paymob = Object.freeze({
  authenticate,
  checkout,
  createOrder,
  voidTransaction,
  refundTransaction,
  authenticateCallback,
  retrieveTransactionById,
  retrieveTransactionByOrderDetails,
});
