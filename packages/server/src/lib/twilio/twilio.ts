import { Twilio } from 'twilio';

export const sendSms = async (to: string, body: string) => {
  const twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  return twilio.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
};
