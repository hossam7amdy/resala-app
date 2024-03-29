import { ENV } from '../config';
import { sendEmail } from '../lib/mailer';
import { sendSms } from '../lib/twilio';

export const sendVerificationEmail = async (email: string, token: string) => {
  const href = `${ENV.SERVER_URL}/verify-email.html?token=${token}&email=${email}`;

  return sendEmail({
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="${href}">here</a> to verify your email</p>`,
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

export const sendWelcomeSms = async (phone: string) => {
  return sendSms(`+2${phone}`, 'Welcome to our service');
};
