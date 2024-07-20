import type { INotification } from '../../interfaces/index.js';

export default class NotificationService {
  constructor(private readonly mailer: INotification) {}

  async sendVerificationEmail(email: string, token: string) {
    const href = `${process.env.APP_URL}/api/v1/auth/verify-email?token=${token}&email=${email}`;

    return await this.mailer.send(
      email,
      'Email Verification',
      `<p>Click <a href="${href}" target="_blank">here</a> to verify your email</p>`
    );
  }

  async sendResetPasswordEmail(email: string, resetCode: string) {
    return await this.mailer.send(email, 'Reset your password', `Your reset code is: ${resetCode}`);
  }

  async sendResetConfirmationEmail(email: string) {
    return await this.mailer.send(
      email,
      'Password reset successful',
      'Your password has been reset successfully'
    );
  }

  async sendOrderConfirmationEmail(email: string, orderId: number) {
    return await this.mailer.send(
      email,
      'Order Confirmation',
      `Your order with id ${orderId} has been confirmed`
    );
  }

  async sendOrderCancellationEmail(email: string, orderId: number) {
    return await this.mailer.send(
      email,
      'Order Cancellation',
      `Your order with id ${orderId} has been cancelled`
    );
  }
}
