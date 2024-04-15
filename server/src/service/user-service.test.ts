import { userService } from '.';
import prismaMock from '../lib/__mocks__/prisma';
import { ConflictError, NotFoundError } from '../utils/api-errors';

jest.mock('../lib/prisma');

const MOCK_USER = {
  id: 1,
  email: 'example@mail.com',
  firstName: 'John',
  lastName: 'Doe',
  isVerified: true,
  phone: '0123456789',
  role: 'CUSTOMER',
  lastLogin: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const MOCK_USER_ADDRESS = {
  id: 1,
  country: 'Egypt',
  state: 'Cairo',
  city: 'Cairo',
  street: 'Elmohandseen',
  building: '1',
  floor: '1',
  address: '1',
  phone: '0123456789',
  firstName: 'John',
  lastName: 'Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('userService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      prismaMock.user.update.mockResolvedValue(MOCK_USER as any);

      const result = await userService.updateUser(1, { phone: '9876543210' });

      expect(result).toEqual(MOCK_USER);
      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { phone: '9876543210' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          isVerified: true,
          phone: true,
          role: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
    });

    it('should throw an error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      try {
        await userService.updateUser(1, { phone: '9876543210' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });

    it('should throw an error if phone already exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      prismaMock.user.findFirst.mockResolvedValue(MOCK_USER as any);

      try {
        await userService.updateUser(2, { phone: MOCK_USER.phone });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictError);
      }
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      prismaMock.user.delete.mockResolvedValue(MOCK_USER as any);

      const result = await userService.deleteUser(1);

      expect(result).toBe(true);
      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      try {
        await userService.deleteUser(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe('findUserById', () => {
    it('should find a user by ID', async () => {
      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);

      const result = await userService.findUserById(1);

      expect(result).toEqual(MOCK_USER);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          isVerified: true,
          phone: true,
          role: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
        where: { id: 1 },
      });
    });

    it('should throw an error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      try {
        await userService.findUserById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe('listUsersPaginated', () => {
    it('should list users paginated', async () => {
      prismaMock.$transaction.mockResolvedValue([1, [MOCK_USER]]);

      const result = await userService.listUsersPaginated({ page: 1, limit: 10 });

      expect(result).toEqual({
        users: [MOCK_USER],
        pagination: { page: 1, total: 1, limit: 10 },
      });
      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserAddressList', () => {
    it('should get user address list', async () => {
      prismaMock.userAddress.findMany.mockResolvedValue([{ address: MOCK_USER_ADDRESS }] as any);

      const result = await userService.getUserAddressList(1);

      expect(result).toEqual([MOCK_USER_ADDRESS]);
      expect(prismaMock.userAddress.findMany).toHaveBeenCalledWith({
        select: {
          address: true,
        },
        where: { userId: 1 },
      });
    });
  });

  describe('createUserAddress', () => {
    it('should create a user address', async () => {
      prismaMock.$transaction.mockResolvedValue(MOCK_USER_ADDRESS);

      const result = await userService.createUserAddress(1, MOCK_USER_ADDRESS as any);

      expect(result).toEqual(MOCK_USER_ADDRESS);
      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserAddress', () => {
    it('should find a user address', async () => {
      prismaMock.userAddress.findFirst.mockResolvedValue({ address: MOCK_USER_ADDRESS } as any);

      const result = await userService.findUserAddress(1, 2);

      expect(result).toEqual(MOCK_USER_ADDRESS);
    });

    it('should throw an error if address not found', async () => {
      prismaMock.userAddress.findFirst.mockResolvedValue(null);

      try {
        await userService.findUserAddress(1, 2);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe('updateUserAddress', () => {
    it('should update a user address', async () => {
      prismaMock.userAddress.findFirst.mockResolvedValue({} as any);
      prismaMock.address.upsert.mockResolvedValue(MOCK_USER_ADDRESS as any);

      const result = await userService.updateUserAddress(1, 2, MOCK_USER_ADDRESS as any);

      expect(result).toEqual(MOCK_USER_ADDRESS);
      expect(prismaMock.userAddress.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.address.upsert).toHaveBeenCalledWith({
        create: MOCK_USER_ADDRESS,
        update: MOCK_USER_ADDRESS,
        where: { id: 2 },
      });
    });

    it('should throw an error if address not found', async () => {
      prismaMock.userAddress.findFirst.mockResolvedValue(null);

      try {
        await userService.updateUserAddress(1, 2, MOCK_USER_ADDRESS as any);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe('deleteUserAddress', () => {
    it('should delete a user address', async () => {
      prismaMock.userAddress.findFirst.mockResolvedValue({} as any);
      prismaMock.address.delete.mockResolvedValue(MOCK_USER_ADDRESS as any);

      const result = await userService.deleteUserAddress(1, 2);

      expect(result).toBe(MOCK_USER_ADDRESS);
      expect(prismaMock.userAddress.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.address.delete).toHaveBeenCalledWith({ where: { id: 2 } });
    });

    it('should throw an error if address not found', async () => {
      prismaMock.userAddress.findFirst.mockResolvedValue(null);

      try {
        await userService.deleteUserAddress(1, 2);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe('listUserAddresses', () => {
    it('should list user addresses', async () => {
      prismaMock.userAddress.findMany.mockResolvedValue([{ address: MOCK_USER_ADDRESS }] as any);

      const result = await userService.listUserAddresses(1);

      expect(result).toEqual([MOCK_USER_ADDRESS]);
      expect(prismaMock.userAddress.findMany).toHaveBeenCalledWith({
        select: {
          address: true,
        },
        where: { userId: 1 },
      });
    });

    it('should return an empty array if no addresses found', async () => {
      prismaMock.userAddress.findMany.mockResolvedValue([] as any);

      const result = await userService.listUserAddresses(1);

      expect(result).toEqual([]);
    });
  });
});
