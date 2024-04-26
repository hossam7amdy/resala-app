import { ENV } from '../config/index.js';
import { sendEmail } from '../lib/mailer/index.js';

export const sendVerificationEmail = async (email: string, token: string) => {
  const href = `${ENV.APP_URL}/api/v1/auth/verify-email?token=${token}&email=${email}`;

  return sendEmail({
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="${href}" target="_blank">here</a> to verify your email</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, resetCode: string) => {
  return sendEmail({
    to: email,
    subject: 'Reset your password',
    text: `Your reset code is: ${resetCode}`,
  });
};

export const sendResetConfirmationEmail = async (email: string) => {
  return sendEmail({
    to: email,
    subject: 'Password reset successful',
    text: 'Your password has been reset successfully',
  });
};
