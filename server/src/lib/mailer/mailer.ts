import nodemailer from 'nodemailer';

import { ENV } from '../../config/env.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: ENV.MAIL_USER,
    pass: ENV.MAIL_PASS,
  },
});

export const sendEmail = (mailOptions: nodemailer.SendMailOptions) => {
  if (ENV.NODE_ENV === 'test') {
    return Promise.resolve({} as nodemailer.SentMessageInfo);
  } else {
    return transporter.sendMail(mailOptions);
  }
};
