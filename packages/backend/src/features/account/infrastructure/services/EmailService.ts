import type { EmailPort } from '@/interfaces';

import type { IEmailService } from '../../domain/contracts/IEmailService';

class EmailService implements IEmailService {
  constructor(private _provider: EmailPort) {}

  async sendVerificationEmail(email: string, link: string) {
    await this._provider.sendEmail(
      [email],
      'Email Verification',
      `<p>Click <a href="${link}" target="_blank">here</a> to verify your email</p>`
    );
  }

  async sendResetPasswordEmail(email: string, link: string) {
    return await this._provider.sendEmail(
      [email],
      'Reset your password',
      `<p>Click <a href="${link}" target="_blank">here</a> to reset your password</p>`
    );
  }

  async sendResetConfirmationEmail(email: string) {
    return await this._provider.sendEmail(
      [email],
      'Password reset successful',
      'Your password has been reset successfully'
    );
  }
}

export { EmailService };
