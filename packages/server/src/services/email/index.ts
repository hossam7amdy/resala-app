import { configuration } from '../../configuration/index.js';
import { SimpleEmailService } from '../ses/index.js';

export class EmailService {
  private static _instance: EmailService | null = null;
  private _ses: SimpleEmailService;

  protected constructor() {
    this._ses = SimpleEmailService.getInstance(configuration);
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new EmailService();
    }

    return this._instance;
  }

  async sendVerificationEmail(email: string, link: string) {
    return await this._ses.sendEmail(
      [email],
      'Email Verification',
      `<p>Click <a href="${link}" target="_blank">here</a> to verify your email</p>`
    );
  }

  async sendResetPasswordEmail(email: string, link: string) {
    return await this._ses.sendEmail(
      [email],
      'Reset your password',
      `<p>Click <a href="${link}" target="_blank">here</a> to reset your password</p>`
    );
  }

  async sendResetConfirmationEmail(email: string) {
    return await this._ses.sendEmail(
      [email],
      'Password reset successful',
      'Your password has been reset successfully'
    );
  }

  async sendOrderConfirmationEmail(email: string, orderId: number, status: string) {
    return await this._ses.sendEmail(
      [email],
      'Order Confirmation',
      `Your order with ID: ${orderId} has been updated to ${status}`
    );
  }

  async sendOrderCancellationEmail(email: string, orderId: number) {
    return await this._ses.sendEmail(
      [email],
      'Order Cancellation',
      `Your order with id ${orderId} has been cancelled`
    );
  }
}
