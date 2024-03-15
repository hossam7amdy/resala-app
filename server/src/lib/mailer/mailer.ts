import nodemailer from 'nodemailer';

import { ENV } from '../../config/env';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: ENV.MAIL_USER,
    pass: ENV.MAIL_PASS,
  },
});

export const sendEmail = (mailOptions: nodemailer.SendMailOptions) => {
  return transporter.sendMail(mailOptions);
};
