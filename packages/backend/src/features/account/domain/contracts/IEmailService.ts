interface IEmailService {
  sendVerificationEmail(email: string, link: string): Promise<void>;
  sendResetPasswordEmail(email: string, link: string): Promise<void>;
  sendResetConfirmationEmail(email: string): Promise<void>;
}

export type { IEmailService };
