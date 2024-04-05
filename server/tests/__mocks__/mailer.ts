import { jest } from '@jest/globals';

jest.mock('nodemailer', () => {
  return {
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(Promise.resolve(true) as never),
    }),
  };
});

export const createTransportMock = jest.fn().mockResolvedValue(Promise.resolve(true) as never);
export const sendMailMock = jest.fn().mockResolvedValue(Promise.resolve(true) as never);
