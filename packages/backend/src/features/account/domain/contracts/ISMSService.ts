interface ISMSService {
  sendOTP(phoneNumber: string, otp: string): Promise<void>;
}

export type { ISMSService };
