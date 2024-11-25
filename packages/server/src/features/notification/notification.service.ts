import type { INotification } from './notification.interface.js';

export class NotificationService {
  constructor(private readonly mailer: INotification) {}

  async sendVerificationEmail(email: string, link: string) {
    return await this.mailer.send(
      email,
      'Email Verification',
      `<p>Click <a href="${link}" target="_blank">here</a> to verify your email</p>`
    );
  }

  async sendResetPasswordEmail(email: string, link: string) {
    return await this.mailer.send(
      email,
      'Reset your password',
      `<p>Click <a href="${link}" target="_blank">here</a> to reset your password</p>`
    );
  }

  async sendResetConfirmationEmail(email: string) {
    return await this.mailer.send(
      email,
      'Password reset successful',
      'Your password has been reset successfully'
    );
  }

  async sendOrderConfirmationEmail(email: string, orderId: number, status: string) {
    return await this.mailer.send(
      email,
      'Order Confirmation',
      `Your order with ID: ${orderId} has been updated to ${status}`
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
