import { authenticate } from './actions/authenticate.js';
import { authenticateCallback } from './actions/authenticateCallback.js';
import { checkout } from './actions/checkout.js';
import { createOrder } from './actions/createOrder.js';
import { refundTransaction } from './actions/refundTransaction.js';
import {
  retrieveTransactionById,
  retrieveTransactionByOrderDetails,
} from './actions/retrieveTransaction.js';
import { voidTransaction } from './actions/voidTransaction.js';

export default class PaymobPaymentService {
  authenticate = authenticate;
  checkout = checkout;
  createOrder = createOrder;
  voidTransaction = voidTransaction;
  refundTransaction = refundTransaction;
  authenticateCallback = authenticateCallback;
  retrieveTransactionById = retrieveTransactionById;
  retrieveTransactionByOrderDetails = retrieveTransactionByOrderDetails;
}
