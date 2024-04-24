import { beforeEach, describe, expect, it, vi } from 'vitest';

import prismaMock from '../lib/__mocks__/prisma.js';
import * as jwtTokenMock from '../lib/jwt-token/jwt-token.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/api-errors.js';
import * as passwordUtilMock from '../utils/password.js';
import * as randomUtilMock from '../utils/random.js';
import * as authService from './auth-service.js';

vi.mock('lib/prisma/index.js', () => ({
  default: prismaMock,
}));
vi.mock('utils/password.js', () => ({
  genHashedPassword: vi.fn(() => ({
    hashedPassword: 'hashed-password',
    salt: 'salt',
    iterations: 10,
  })),
  verifyHashedPassword: vi.fn(() => true),
}));
vi.mock('utils/random.js', () => ({
  generateRandomString: vi.fn(() => 'random-code'),
}));
vi.mock('lib/jwt-token/jwt-token.js', () => ({
  signJwt: vi.fn(() => 'jwt-token'),
  verifyJwt: vi.fn(() => ({ id: MOCK_USER.id, email: MOCK_USER.email })),
}));

const MOCK_USER = {
  id: 1,
  email: 'test@mail.com',
  firstName: 'Test',
  lastName: 'User',
  isVerified: true,
  phone: '1234567890',
  role: 'CUSTOMER',
  password: 'password',
  lastLogin: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  salt: 'salt',
  iterations: 10,
};

const SELECT = {
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
};

describe('auth-service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('authenticate', () => {
    const sign = 'test@mail.com';
    const password = 'password';
    it('should authenticate a user with valid credentials', async () => {
      prismaMock.user.findFirst.mockResolvedValue(MOCK_USER as any);
      prismaMock.user.update.mockResolvedValue(MOCK_USER as any);

      vi.spyOn(passwordUtilMock, 'verifyHashedPassword').mockResolvedValue(true);
      vi.spyOn(jwtTokenMock, 'signJwt').mockReturnValue('jwt-token');

      const result = await authService.authenticate(sign, password);

      expect(result).toEqual({
        accessToken: 'jwt-token',
        refreshToken: 'jwt-token',
        expiresAt: expect(result.expiresAt).toBeInstanceOf(Date),
        user: expect.objectContaining(MOCK_USER),
      });
      expect(jwtTokenMock.signJwt).toHaveBeenCalledTimes(2);
      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: { OR: [{ email: sign }, { phone: sign }] },
      });
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        data: { lastLogin: expect.any(Date) },
        where: { id: MOCK_USER.id },
      });
    });

    it('should throw NotFoundError for non-register user', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);

      await expect(authService.authenticate(sign, password)).rejects.toThrow(NotFoundError);

      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: { OR: [{ email: sign }, { phone: sign }] },
      });
      expect(prismaMock.user.update).not.toHaveBeenCalled();
      expect(jwtTokenMock.signJwt).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError for invalid credentials', async () => {
      prismaMock.user.findFirst.mockResolvedValue(MOCK_USER as any);

      vi.spyOn(passwordUtilMock, 'verifyHashedPassword').mockResolvedValue(false);

      await expect(authService.authenticate(sign, 'invalid-password')).rejects.toThrow(
        BadRequestError
      );
      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: { OR: [{ email: sign }, { phone: sign }] },
      });
      expect(prismaMock.user.update).not.toHaveBeenCalled();
      expect(jwtTokenMock.signJwt).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(MOCK_USER as any);

      vi.spyOn(passwordUtilMock, 'genHashedPassword').mockResolvedValue({
        hashedPassword: 'hashed-password',
        salt: 'salt',
        iterations: 10,
      });

      const payload = {
        email: MOCK_USER.email,
        firstName: MOCK_USER.firstName,
        lastName: MOCK_USER.lastName,
        password: 'password',
        phone: MOCK_USER.phone,
      };

      const result = await authService.register(payload);

      expect(result).toMatchObject({
        user: expect.objectContaining(MOCK_USER),
        verifyToken: expect.any(String),
      });
      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: { OR: [{ email: payload.email }, { phone: payload.phone }] },
      });
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        select: SELECT,
        data: {
          ...payload,
          password: 'hashed-password',
          salt: 'salt',
          iterations: 10,
        },
      });
      expect(jwtTokenMock.signJwt).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictError if email is already registered', async () => {
      const payload = {
        email: MOCK_USER.email,
        firstName: MOCK_USER.firstName,
        lastName: MOCK_USER.lastName,
        password: 'password',
        phone: MOCK_USER.phone,
      };

      prismaMock.user.findFirst.mockResolvedValue(MOCK_USER as any);

      await expect(authService.register(payload)).rejects.toThrow(ConflictError);

      expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
        where: { OR: [{ email: payload.email }, { phone: payload.phone }] },
      });
      expect(prismaMock.user.create).not.toHaveBeenCalled();
      expect(jwtTokenMock.signJwt).not.toHaveBeenCalled();
    });
  });

  describe('verifyEmail', () => {
    it('should verify the email address for a user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      vi.spyOn(jwtTokenMock, 'verifyJwt').mockReturnValue({ id: -1, email: MOCK_USER.email });

      const email = MOCK_USER.email;
      const token = 'token';

      const result = await authService.verifyEmail(email, token);

      expect(result).toBe(true);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        data: { isVerified: true },
        where: { id: MOCK_USER.id },
      });
    });

    it('should throw NotFoundError if user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(authService.verifyEmail('invalid-email', 'token')).rejects.toThrow(
        NotFoundError
      );
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'invalid-email' },
      });
      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if verification token is invalid', async () => {
      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      vi.spyOn(jwtTokenMock, 'verifyJwt').mockReturnValue({ id: -1, email: 'invalid-email' });

      await expect(authService.verifyEmail(MOCK_USER.email, 'invalid-token')).rejects.toThrow(
        BadRequestError
      );
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: MOCK_USER.email },
      });
      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });
  });

  describe('changePassword', () => {
    it('should change the password for a user', async () => {
      const email = MOCK_USER.email;
      const oldPassword = 'password';
      const newPassword = 'new-password';
      const newSalt = 'new salt';
      const newIterations = 10;
      const newHashedPassword = 'new-hashed-password';

      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      vi.spyOn(passwordUtilMock, 'verifyHashedPassword').mockResolvedValue(true);
      vi.spyOn(passwordUtilMock, 'genHashedPassword').mockResolvedValue({
        hashedPassword: newHashedPassword,
        iterations: newIterations,
        salt: newSalt,
      });

      await authService.changePassword(email, oldPassword, newPassword);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(passwordUtilMock.verifyHashedPassword).toHaveBeenCalledWith({
        password: oldPassword,
        salt: MOCK_USER.salt,
        iterations: MOCK_USER.iterations,
        hashedPassword: MOCK_USER.password,
      });
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        data: {
          password: newHashedPassword,
          salt: newSalt,
          iterations: newIterations,
        },
        where: { id: MOCK_USER.id },
      });
    });

    it('should throw NotFoundError if user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.changePassword('invalid-email', 'password', 'new-password')
      ).rejects.toThrow(NotFoundError);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'invalid-email' },
      });
      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedError if old password is incorrect', async () => {
      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      vi.spyOn(passwordUtilMock, 'verifyHashedPassword').mockResolvedValue(false);

      await expect(
        authService.changePassword(MOCK_USER.email, 'invalid-password', 'new-password')
      ).rejects.toThrow(BadRequestError);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: MOCK_USER.email },
      });
      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });
  });

  describe('forgotPassword', () => {
    it('should send a password reset email to the user', async () => {
      const email = MOCK_USER.email;
      const randomCode = 'ABC123';

      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      vi.spyOn(randomUtilMock, 'generateRandomString').mockReturnValue(randomCode);
      vi.spyOn(jwtTokenMock, 'signJwt').mockReturnValue('jwt-token');

      await authService.forgotPassword(email);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(randomUtilMock.generateRandomString).toHaveBeenCalledWith(6);
      expect(jwtTokenMock.signJwt).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(authService.forgotPassword('invalid-email')).rejects.toThrow(NotFoundError);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'invalid-email' },
      });
      expect(randomUtilMock.generateRandomString).not.toHaveBeenCalled();
      expect(jwtTokenMock.signJwt).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should reset the password for a user', async () => {
      const token = 'jwt-token';
      const code = 'ABC123';
      const newPassword = 'new-password';
      const newSalt = 'new salt';
      const newIterations = 10;
      const newHashedPassword = 'new-hashed-password';

      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      vi.spyOn(jwtTokenMock, 'verifyJwt').mockReturnValue({
        id: MOCK_USER.id,
        email: MOCK_USER.email,
        resetCode: code,
      });
      vi.spyOn(randomUtilMock, 'generateRandomString').mockReturnValue(code);
      vi.spyOn(passwordUtilMock, 'genHashedPassword').mockResolvedValue({
        hashedPassword: newHashedPassword,
        iterations: newIterations,
        salt: newSalt,
      });

      await authService.resetPassword(token, code, newPassword);

      expect(jwtTokenMock.verifyJwt).toHaveBeenCalledTimes(1);
      expect(passwordUtilMock.genHashedPassword).toHaveBeenCalledWith(newPassword);
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        data: {
          password: newHashedPassword,
          salt: newSalt,
          iterations: newIterations,
        },
        where: { id: MOCK_USER.id },
      });
    });

    it('should throw BadRequestError if reset token or code is invalid', async () => {
      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      vi.spyOn(jwtTokenMock, 'verifyJwt').mockReturnValue({ id: -1, email: 'invalid-email' });

      await expect(
        authService.resetPassword('invalid-token', 'invalid-code', 'new-password')
      ).rejects.toThrow(BadRequestError);
      expect(jwtTokenMock.verifyJwt).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.resetPassword('jwt-token', 'ABC123', 'new-password')
      ).rejects.toThrow(BadRequestError);
      expect(jwtTokenMock.verifyJwt).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.update).not.toHaveBeenCalled();
    });
  });

  describe('refreshToken', () => {
    it('should refresh the JWT token', async () => {
      const token = 'jwt token';
      const newToken = 'new jwt token';

      vi.spyOn(jwtTokenMock, 'signJwt').mockReturnValue(newToken);
      prismaMock.user.findUnique.mockResolvedValue(MOCK_USER as any);
      vi.spyOn(jwtTokenMock, 'verifyJwt').mockReturnValue({
        id: MOCK_USER.id,
        email: MOCK_USER.email,
      });

      const result = await authService.refreshToken(token);

      expect(result).toEqual({
        expiresAt: expect(result.expiresAt).toBeInstanceOf(Date),
        accessToken: newToken,
      });
      expect(jwtTokenMock.verifyJwt).toHaveBeenCalledTimes(1);
      expect(jwtTokenMock.signJwt).toHaveBeenCalledTimes(1);
    });

    it('should throw TokenExpiredError if token is expired', async () => {
      vi.spyOn(jwtTokenMock, 'verifyJwt').mockImplementation(() => {
        throw new Error('TokenExpiredError');
      });

      await expect(authService.refreshToken('expired-token')).rejects.toThrow(UnauthorizedError);

      expect(jwtTokenMock.verifyJwt).toHaveBeenCalledTimes(1);
      expect(jwtTokenMock.signJwt).not.toHaveBeenCalled();
    });
  });

  describe('validateJwtToken', () => {
    it('should validate the JWT token', async () => {
      const token = 'jwt token';
      const secret = 'secret';

      const result = await authService.validateJwtToken(token, secret);

      console.log('authService.validateJwtToken', result);

      expect(result).toEqual({ id: MOCK_USER.id, email: MOCK_USER.email });
      expect(jwtTokenMock.verifyJwt).toHaveBeenCalledWith(token, secret);
    });

    it('should throw UnauthorizedError if token is invalid', async () => {
      vi.spyOn(jwtTokenMock, 'verifyJwt').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(authService.validateJwtToken('invalid-token', 'secret')).rejects.toThrow(
        Error('Invalid token')
      );
    });
  });
});
