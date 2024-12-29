import type { ISMSService } from '../../domain/contracts/ISMSService';

class SMSService implements ISMSService {
  async sendOTP(phoneNumber: string, otp: string): Promise<void> {
    console.log(`Sending OTP to ${phoneNumber}: ${otp}`);
    throw new Error('Method not implemented.');
  }
}

export { SMSService };
