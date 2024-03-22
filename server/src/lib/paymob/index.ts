import { authenticate } from './authenticate';
import { authenticateCallback } from './authenticate-callback';
import { checkout } from './checkout';
import { createOrder } from './create-order';
import { refundTransaction } from './refund-transaction';
import { retrieveTransactionById, retrieveTransactionByOrderDetails } from './retrieve-transaction';
import { voidTransaction } from './void-transaction';

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
