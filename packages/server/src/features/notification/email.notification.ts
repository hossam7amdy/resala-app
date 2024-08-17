import nodemailer from 'nodemailer';

import type { INotification } from './notification.interface.js';

export class EmailNotificationService implements INotification {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async send(to: string | string[], subject: string, body: string) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      html: body,
    };

    await this._sendEmail(mailOptions);
  }

  async _sendEmail(mailOptions: nodemailer.SendMailOptions) {
    if (process.env.NODE_ENV === 'test') {
      return Promise.resolve({} as nodemailer.SentMessageInfo);
    } else {
      return this.transporter.sendMail(mailOptions);
    }
  }
}
