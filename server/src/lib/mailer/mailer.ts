import nodemailer from 'nodemailer';

import ENV from '../../env';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: ENV.MAIL_USER,
    pass: ENV.MAIL_PASS,
  },
});

const send = (mailOptions: nodemailer.SendMailOptions) => {
  return transporter.sendMail(mailOptions);
};

export default { send };
