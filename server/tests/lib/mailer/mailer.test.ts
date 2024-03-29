import { describe, expect, it, jest } from '@jest/globals';
import * as nodemailer from 'nodemailer';

import { sendEmail } from '../../../src/lib/mailer';

jest.mock('nodemailer', () => {
  return {
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(Promise.resolve(true) as never),
    }),
  };
});

describe('sendEmail', () => {
  it('should call sendMail with correct parameters', async () => {
    const mockMailOptions: nodemailer.SendMailOptions = {
      from: 'test@test.com',
      to: 'test2@test.com',
      subject: 'Test',
      text: 'Test message',
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.test.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'test@test.com', // generated ethereal user
        pass: 'test', // generated ethereal password
      },
    });

    const spy = jest.spyOn(transporter, 'sendMail');
    await sendEmail(mockMailOptions);
    expect(spy).toHaveBeenCalledWith(mockMailOptions);
  });

  it('should throw error if sendMail fails', async () => {
    const mockMailOptions: nodemailer.SendMailOptions = {
      from: 'test@test.com',
      to: 'test2@test.com',
      subject: 'Test',
      text: 'Test message',
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.test.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'test@test.com', // generated ethereal user
        pass: 'test', // generated ethereal password
      },
    });

    const spy = jest.spyOn(transporter, 'sendMail');
    spy.mockRejectedValue(new Error('Failed to send email'));

    await expect(sendEmail(mockMailOptions)).rejects.toThrow('Failed to send email');
  });
});
