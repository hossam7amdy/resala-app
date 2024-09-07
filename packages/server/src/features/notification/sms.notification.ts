import Twilio from 'twilio';

import type { INotification } from './notification.interface.js';

export class SmsNotificationService implements INotification {
  private readonly twilio: Twilio.Twilio;
  private readonly phoneNumber: string;

  constructor() {
    this.twilio = new Twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;
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
          from: this.phoneNumber,
          to: phone,
          body,
        })
      )
    );
  }

  async _sendSingle(to: string, body: string) {
    await this.twilio.messages.create({
      from: this.phoneNumber,
      to,
      body,
    });
  }
}
