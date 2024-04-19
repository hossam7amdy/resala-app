import { Twilio } from 'twilio';

import { ENV } from '../../config/index.js';

const twilio = new Twilio(ENV.TWILIO_ACCOUNT_SID, ENV.TWILIO_AUTH_TOKEN);

export const sendSms = async (to: string, body: string) => {
  return twilio.messages.create({
    body,
    from: ENV.TWILIO_PHONE_NUMBER,
    to,
  });
};
