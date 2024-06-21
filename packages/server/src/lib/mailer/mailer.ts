import nodemailer from 'nodemailer';

import type { IMailer } from '../../interfaces/index.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = (mailOptions: nodemailer.SendMailOptions) => {
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve({} as nodemailer.SentMessageInfo);
  } else {
    return transporter.sendMail(mailOptions);
  }
};

export default class NodeMailer implements IMailer {
  async send(to: string | string[], subject: string, body: string) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      html: body,
    };

    await sendEmail(mailOptions);
  }
}
