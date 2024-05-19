import nodemailer from 'nodemailer';

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
