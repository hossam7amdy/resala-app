export type MarketingState = 'subscribed' | 'unsubscribed' | 'pending';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  locale?: string;
  emailMarketingState?: MarketingState;
  smsMarketingState?: MarketingState;
}
