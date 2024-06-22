import Twilio from 'twilio';

import type { INotification } from '../../interfaces/index.js';

export default class SmsNotificationService implements INotification {
  private readonly twilio: Twilio.Twilio;

  constructor() {
    this.twilio = new Twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  async send(to: string | string[], _: string, body: string) {
    if (Array.isArray(to)) {
      await this._sendMany(to, body);
    } else {
      await this._sendSingle(to, body);
    }
  }

  async _sendMany(to: string[], body: string) {
    await Promise.all(
      to.map(phone =>
        this.twilio.messages.create({
          body,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone,
        })
      )
    );
  }

  async _sendSingle(to: string, body: string) {
    await this.twilio.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
  }
}
