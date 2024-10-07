import nodemailer from 'nodemailer';

export class Nodemailer {
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
      from: 'noreply@resala.com',
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
