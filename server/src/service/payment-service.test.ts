import { Address } from '@prisma/client';

import { paymentService } from '.';
import prismaMock from '../lib/__mocks__/prisma';
import callback from '../lib/paymob/callback.json';
import { NotFoundError } from '../utils/api-errors';

const MOCK_CREATE_PAYMENT = {
  email: 'example@mail.com',
  orderId: 1,
  amount: 100.5,
  items: [],
  shipping: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '123456789',
    country: 'Egypt',
    state: 'Cairo',
    city: 'Cairo',
    street: '123 Main St',
    building: null,
    floor: null,
    address: null,
  } as Address,
};

const CHECKOUT_RESPONSE = {
  token: 'token123',
  iframeUrl: 'https://accept.paymob.com/api/acceptance/iframes/726054?payment_token=token123',
};

const MOCK_PAYMENT = {
  id: 1,
  orderId: 1,
  transactionId: 1,
  transactionOrderId: 1,
  pending: true,
  success: false,
  isAuth: false,
  isCapture: false,
  amountCents: 100 * 100.5,
  isVoided: false,
  isRefunded: false,
  is3DSecure: false,
  integrationId: 1,
  deliveryNeeded: false,
  currency: 'EGP',
  createdAt: new Date(),
  updatedAt: new Date(),
};

jest.mock('../lib/prisma');
jest.mock('../lib/paymob', () => ({
  paymob: {
    authenticate: jest.fn().mockResolvedValue({ token: 'token123' }),
    createOrder: jest.fn().mockResolvedValue({ id: 1 }),
    checkout: jest.fn().mockResolvedValue({
      token: 'token123',
      iframeUrl: 'https://accept.paymob.com/api/acceptance/iframes/726054?payment_token=token123',
    }),
    voidTransaction: jest.fn().mockResolvedValue({}),
    refundTransaction: jest.fn().mockResolvedValue({}),
    retrieveTransactionById: jest.fn().mockResolvedValue({}),
    retrieveTransactionByOrderDetails: jest.fn().mockResolvedValue({}),
    authenticateCallback: jest.fn().mockResolvedValue(true),
  },
}));

describe('Payment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPaymentRequest', () => {
    it('should create a payment request', async () => {
      const result = await paymentService.createPaymentRequest(MOCK_CREATE_PAYMENT);

      expect(result).toEqual(CHECKOUT_RESPONSE);
    });
  });

  describe('createPayment', () => {
    it('should create a payment', async () => {
      prismaMock.payment.upsert.mockResolvedValue(MOCK_PAYMENT as any);

      const result = await paymentService.createPayment('hmac', callback.obj);

      expect(result).toEqual('PAID');
      expect(prismaMock.payment.upsert).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPayment', () => {
    it('should get a payment', async () => {
      prismaMock.payment.findUnique.mockResolvedValue(MOCK_PAYMENT as any);

      const result = await paymentService.getPayment(1);

      expect(result).toEqual(MOCK_PAYMENT);
      expect(prismaMock.payment.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.payment.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw a not found error if payment does not exist', async () => {
      prismaMock.payment.findUnique.mockResolvedValue(null);

      await expect(paymentService.getPayment(1)).rejects.toThrow(NotFoundError);
    });
  });

  describe('getPaymentsList', () => {
    it('should get a list of payments', async () => {
      const filters = { page: 1, limit: 10, query: '' };

      prismaMock.payment.findMany.mockResolvedValue([MOCK_PAYMENT] as any);

      const result = await paymentService.getPaymentsList(filters);

      expect(result).toEqual([MOCK_PAYMENT]);
      expect(prismaMock.payment.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.payment.findMany).toHaveBeenCalledWith({
        take: filters.limit,
        skip: filters.page * filters.limit,
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
