import { Twilio } from 'twilio';

const twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSms = async (to: string, body: string) => {
  return twilio.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
};
