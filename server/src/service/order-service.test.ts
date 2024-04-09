import { orderService } from '.';
import prismaMock from '../lib/__mocks__/prisma';
import { NotFoundError } from '../utils/api-errors';

jest.mock('../lib/prisma');

const MOCK_ORDER_INPUT = {
  userId: 1,
  address: {
    street: '123 Main St',
    city: 'Cairo',
    state: 'Cairo',
    country: 'Egypt',
    building: null,
    floor: null,
    address: null,
    phone: '',
    firstName: '',
    lastName: '',
  },
  paymentMethod: 'CARD',
  items: [],
  note: 'Please deliver before 5 PM',
};

const MOCK_ORDER = {
  id: 23,
  userId: 3,
  subtotal: '600',
  discount: '0',
  total: '660',
  orderStatus: 'PENDING',
  paymentMethod: 'CARD',
  paymentStatus: 'PENDING',
  note: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const MOCK_ORDER_OUTPUT = {
  ...MOCK_ORDER,
  user: {},
  orderItems: [],
  paymentDetails: {},
  shippingDetails: {},
};

describe('Order Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const orderId = 1;
      const addressId = 2;

      prismaMock.$transaction.mockResolvedValueOnce(orderId);
      prismaMock.order.create.mockResolvedValueOnce({ id: orderId } as any);
      prismaMock.orderItem.createMany.mockResolvedValueOnce({} as any);
      prismaMock.address.create.mockResolvedValueOnce({ id: addressId } as any);
      prismaMock.shipping.create.mockResolvedValueOnce({} as any);
      prismaMock.order.findUnique.mockResolvedValueOnce(MOCK_ORDER_OUTPUT as any);

      const result = await orderService.createOrder(MOCK_ORDER_INPUT as any);

      expect(result).toEqual(MOCK_ORDER_OUTPUT);
      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    });
  });

  describe('listOrdersPaginated', () => {
    it('should list orders with pagination', async () => {
      const orders = [MOCK_ORDER_OUTPUT, MOCK_ORDER_OUTPUT];

      prismaMock.order.findMany.mockResolvedValueOnce(orders as any);

      const result = await orderService.listOrdersPaginated({ page: 0, limit: 10, query: '' });

      expect(result).toEqual(orders);
      expect(prismaMock.order.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.order.findMany).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findUserOrderById', () => {
    it('should find a user order by ID', async () => {
      const orderId = 1;
      const userId = 1;

      prismaMock.order.findUnique.mockResolvedValueOnce(MOCK_ORDER_OUTPUT as any);

      const result = await orderService.findUserOrderById(orderId, userId);

      expect(result).toEqual(MOCK_ORDER_OUTPUT);
      expect(prismaMock.order.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.order.findUnique).toHaveBeenCalledWith({
        where: { id: orderId, userId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          orderItems: true,
          paymentDetails: true,
          shippingDetails: true,
        },
      });
    });

    it('should throw an error if order not found', async () => {
      prismaMock.order.findUnique.mockResolvedValueOnce(null);

      await expect(orderService.findUserOrderById(1, 1)).rejects.toThrow(NotFoundError);
    });
  });

  describe('findOrderById', () => {
    it('should find an order by ID', async () => {
      const orderId = 1;

      prismaMock.order.findUnique.mockResolvedValueOnce(MOCK_ORDER_OUTPUT as any);

      const result = await orderService.findOrderById(orderId);

      expect(result).toEqual(MOCK_ORDER_OUTPUT);
      expect(prismaMock.order.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.order.findUnique).toHaveBeenCalledWith({
        where: { id: orderId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          orderItems: true,
          paymentDetails: true,
          shippingDetails: true,
        },
      });
    });

    it('should throw an error if order not found', async () => {
      prismaMock.order.findUnique.mockResolvedValueOnce(null);

      await expect(orderService.findOrderById(1)).rejects.toThrow(NotFoundError);
    });
  });

  describe('getUserOrders', () => {
    it('should get user orders with pagination', async () => {
      const userId = 1;
      const filters = { page: 0, limit: 10, query: '' };
      const orders = [MOCK_ORDER_OUTPUT, MOCK_ORDER_OUTPUT];

      prismaMock.order.findMany.mockResolvedValueOnce(orders as any);

      const result = await orderService.getUserOrders(userId, filters);

      expect(result).toEqual(orders);
      expect(prismaMock.order.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.order.findMany).toHaveBeenCalledWith({
        take: filters.limit,
        skip: filters.page * filters.limit,
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('updateOrder', () => {
    it('should update an order', async () => {
      const orderId = 1;
      const order = { status: 'DELIVERED' };

      prismaMock.order.findUnique.mockResolvedValueOnce(MOCK_ORDER_OUTPUT as any);
      prismaMock.order.update.mockResolvedValueOnce(MOCK_ORDER_OUTPUT as any);

      const result = await orderService.updateOrder(orderId, order as any);

      expect(result).toEqual(MOCK_ORDER_OUTPUT);
      expect(prismaMock.order.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.order.update).toHaveBeenCalledWith({
        where: { id: orderId },
        data: order,
      });
    });

    it('should throw an error if order not found', async () => {
      prismaMock.order.findUnique.mockResolvedValueOnce(null);

      await expect(orderService.updateOrder(1, {} as any)).rejects.toThrow(NotFoundError);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel a user order', async () => {
      const orderId = 1;
      const userId = 1;

      prismaMock.order.findUnique.mockResolvedValueOnce(MOCK_ORDER_OUTPUT as any);
      prismaMock.order.update.mockResolvedValueOnce(MOCK_ORDER_OUTPUT as any);

      const result = await orderService.cancelOrder(orderId, userId);

      expect(result).toEqual(MOCK_ORDER_OUTPUT);
      expect(prismaMock.order.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.order.update).toHaveBeenCalledWith({
        data: { orderStatus: 'CANCELLED' },
        where: { id: orderId },
        include: { paymentDetails: true },
      });
    });

    it('should throw an error if order not found', async () => {
      prismaMock.order.findUnique.mockResolvedValueOnce(null);

      await expect(orderService.cancelOrder(1, 1)).rejects.toThrow(NotFoundError);
    });

    it('should throw an BadRequestError if order is not created today', async () => {
      const order = { ...MOCK_ORDER_OUTPUT, createdAt: new Date('2021-01-01') };

      prismaMock.order.findUnique.mockResolvedValueOnce(order as any);

      await expect(orderService.cancelOrder(1, 1)).rejects.toThrow();
    });
  });

  describe('adminCancelOrder', () => {
    it('should cancel an order by admin', async () => {
      const orderId = 1;

      prismaMock.order.findUnique.mockResolvedValueOnce(MOCK_ORDER_OUTPUT as any);
      prismaMock.order.update.mockResolvedValueOnce(MOCK_ORDER_OUTPUT as any);

      const result = await orderService.adminCancelOrder(orderId);

      expect(result).toEqual(MOCK_ORDER_OUTPUT);
      expect(prismaMock.order.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.order.update).toHaveBeenCalledWith({
        data: { orderStatus: 'CANCELLED' },
        where: { id: orderId },
        include: { paymentDetails: true },
      });
    });

    it('should throw an error if order not found', async () => {
      prismaMock.order.findUnique.mockResolvedValueOnce(null);

      await expect(orderService.adminCancelOrder(1)).rejects.toThrow(NotFoundError);
    });
  });
});
