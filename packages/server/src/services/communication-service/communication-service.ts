import { sendEmail } from '../../lib/mailer/index.js';

export const sendVerificationEmail = async (email: string, token: string) => {
  const href = `${process.env.APP_URL}/api/v1/auth/verify-email?token=${token}&email=${email}`;

  return await sendEmail({
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="${href}" target="_blank">here</a> to verify your email</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, resetCode: string) => {
  return await sendEmail({
    to: email,
    subject: 'Reset your password',
    text: `Your reset code is: ${resetCode}`,
  });
};

export const sendResetConfirmationEmail = async (email: string) => {
  return await sendEmail({
    to: email,
    subject: 'Password reset successful',
    text: 'Your password has been reset successfully',
  });
};

export const sendOrderConfirmationEmail = async (email: string, orderId: number) => {
  return await sendEmail({
    to: email,
    subject: 'Order Confirmation',
    text: `Your order with id ${orderId} has been confirmed`,
  });
};

export const sendOrderCancellationEmail = async (email: string, orderId: number) => {
  return await sendEmail({
    to: email,
    subject: 'Order Cancellation',
    text: `Your order with id ${orderId} has been cancelled`,
  });
};
