import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { mock, mockClear } from 'vitest-mock-extended';

import type { EmailNotification } from '../email.notification.js';
import { NotificationService } from '../notification.service.js';

describe('Notification Service', () => {
  let emailNotificationService: EmailNotification;
  let notificationService: NotificationService;

  beforeAll(() => {
    emailNotificationService = mock<EmailNotification>();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockClear(emailNotificationService);

    notificationService = new NotificationService(emailNotificationService);
  });

  it('should send a verification email', async () => {
    const email = 'test@example.com';
    const token = '123456';
    await notificationService.sendVerificationEmail(email, token);
    expect(emailNotificationService.send).toHaveBeenCalledWith(
      email,
      'Email Verification',
      `<p>Click <a href="http://localhost:5000/api/v1/auth/verify-email?token=123456&email=test@example.com" target="_blank">here</a> to verify your email</p>`
    );
  });

  it('should send a reset password email', async () => {
    const email = 'test@example.com';
    const resetCode = '123456';
    await notificationService.sendResetPasswordEmail(email, resetCode);
    expect(emailNotificationService.send).toHaveBeenCalledWith(
      email,
      'Reset your password',
      `Your reset code is: <b>${resetCode}</b>`
    );
  });

  it('should send a reset confirmation email', async () => {
    const email = 'test@example.com';
    await notificationService.sendResetConfirmationEmail(email);
    expect(emailNotificationService.send).toHaveBeenCalledWith(
      email,
      'Password reset successful',
      'Your password has been reset successfully'
    );
  });

  it('should send an order confirmation email', async () => {
    const email = 'test@example.com';
    const orderId = 123;
    const status = 'confirmed';
    await notificationService.sendOrderConfirmationEmail(email, orderId, status);
    expect(emailNotificationService.send).toHaveBeenCalledWith(
      email,
      'Order Confirmation',
      `Your order with ID: ${orderId} has been updated to ${status}`
    );
  });

  it('should send an order cancellation email', async () => {
    const email = 'test@example.com';
    const orderId = 123;

    await notificationService.sendOrderCancellationEmail(email, orderId);

    expect(emailNotificationService.send).toHaveBeenCalledWith(
      email,
      'Order Cancellation',
      `Your order with id ${orderId} has been cancelled`
    );
  });
});
