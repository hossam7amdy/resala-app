import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendEmail } from '../../lib/mailer/index.js';
import {
  sendOrderCancellationEmail,
  sendOrderConfirmationEmail,
  sendResetConfirmationEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
} from './communicationService';

vi.mock('lib/mailer/index.js');

describe('Communication Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send a verification email', async () => {
    const email = 'test@example.com';
    const token = '123456';
    await sendVerificationEmail(email, token);
    expect(sendEmail).toHaveBeenCalledWith({
      to: email,
      subject: 'Email Verification',
      html: expect.stringContaining(token),
    });
  });

  it('should send a reset password email', async () => {
    const email = 'test@example.com';
    const resetCode = '123456';
    await sendResetPasswordEmail(email, resetCode);
    expect(sendEmail).toHaveBeenCalledWith({
      to: email,
      subject: 'Reset your password',
      text: `Your reset code is: ${resetCode}`,
    });
  });

  it('should send a reset confirmation email', async () => {
    const email = 'test@example.com';
    await sendResetConfirmationEmail(email);
    expect(sendEmail).toHaveBeenCalledWith({
      to: email,
      subject: 'Password reset successful',
      text: 'Your password has been reset successfully',
    });
  });

  it('should send an order confirmation email', async () => {
    const email = 'test@example.com';
    const orderId = 123;
    await sendOrderConfirmationEmail(email, orderId);
    expect(sendEmail).toHaveBeenCalledWith({
      to: email,
      subject: 'Order Confirmation',
      text: `Your order with id ${orderId} has been confirmed`,
    });
  });

  it('should send an order cancellation email', async () => {
    const email = 'test@example.com';
    const orderId = 123;
    await sendOrderCancellationEmail(email, orderId);
    expect(sendEmail).toHaveBeenCalledWith({
      to: email,
      subject: 'Order Cancellation',
      text: `Your order with id ${orderId} has been cancelled`,
    });
  });
});
