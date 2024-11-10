import { beforeEach, describe, expect, it, vi } from 'vitest';

import { EmailService } from '../email';

// Mock Nodemailer
vi.mock('../nodemailer', () => ({
  Nodemailer: vi.fn().mockImplementation(() => ({
    send: vi.fn().mockResolvedValue(true),
  })),
}));

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    // Get a new instance of EmailService
    emailService = EmailService.getInstance();
  });

  it('should be a singleton', () => {
    const instance1 = EmailService.getInstance();
    const instance2 = EmailService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should send verification email', async () => {
    const email = 'test@example.com';
    const link = 'https://example.com/verify';

    await emailService.sendVerificationEmail(email, link);

    expect(emailService['_mailer'].send).toHaveBeenCalledWith(
      email,
      'Email Verification',
      `<p>Click <a href="${link}" target="_blank">here</a> to verify your email</p>`
    );
  });

  it('should send reset password email', async () => {
    const email = 'test@example.com';
    const link = 'https://example.com/reset';

    await emailService.sendResetPasswordEmail(email, link);

    expect(emailService['_mailer'].send).toHaveBeenCalledWith(
      email,
      'Reset your password',
      `<p>Click <a href="${link}" target="_blank">here</a> to reset your password</p>`
    );
  });

  it('should send reset confirmation email', async () => {
    const email = 'test@example.com';

    await emailService.sendResetConfirmationEmail(email);

    expect(emailService['_mailer'].send).toHaveBeenCalledWith(
      email,
      'Password reset successful',
      'Your password has been reset successfully'
    );
  });

  it('should send order confirmation email', async () => {
    const email = 'test@example.com';
    const orderId = 12345;
    const status = 'Shipped';

    await emailService.sendOrderConfirmationEmail(email, orderId, status);

    expect(emailService['_mailer'].send).toHaveBeenCalledWith(
      email,
      'Order Confirmation',
      `Your order with ID: ${orderId} has been updated to ${status}`
    );
  });

  it('should send order cancellation email', async () => {
    const email = 'test@example.com';
    const orderId = 12345;

    await emailService.sendOrderCancellationEmail(email, orderId);

    expect(emailService['_mailer'].send).toHaveBeenCalledWith(
      email,
      'Order Cancellation',
      `Your order with id ${orderId} has been cancelled`
    );
  });
});
