import { Injectable } from '@angular/core';
import {
  fetchAuthSession,
  fetchUserAttributes,
  signOut,
  signUp,
  updatePassword,
  updateUserAttribute,
  updateUserAttributes,
} from 'aws-amplify/auth';
import type { SignUpInput } from 'aws-amplify/auth';

import { IUser, MarketingState } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  signUp(input: SignUpInput) {
    const { username, password, options } = input;

    const customEmail = options?.userAttributes?.email?.toLowerCase();
    return signUp({
      username: username.toLowerCase(),
      password,
      options: {
        ...options,
        userAttributes: {
          ...options?.userAttributes,
          email: customEmail,
          locale: navigator.language,
          'custom:emailMarketingState': 'pending' as MarketingState,
          'custom:smsMarketingState': 'pending' as MarketingState,
        },
      },
    });
  }

  async fetchSessionOrAccessToken(): Promise<string | null> {
    try {
      const session = await fetchAuthSession({ forceRefresh: true });

      return session.tokens?.accessToken.toString() || session.credentials?.sessionToken || null;
    } catch {
      return null;
    }
  }

  async getCurrentUser(): Promise<IUser> {
    const currentUser = await fetchUserAttributes();

    return {
      id: currentUser.sub!,
      firstName: currentUser.given_name!,
      lastName: currentUser.family_name!,
      email: currentUser.email!,
      phone: currentUser.phone_number,
      locale: currentUser.locale,
      emailMarketingState: currentUser['custom:emailMarketingState'] as MarketingState,
      smsMarketingState: currentUser['custom:smsMarketingState'] as MarketingState,
    };
  }

  updateUserLocale(locale: string) {
    return updateUserAttribute({
      userAttribute: { attributeKey: 'locale', value: locale },
    });
  }

  updateCurrentUser(user: Partial<IUser>) {
    return updateUserAttributes({
      userAttributes: {
        given_name: user.firstName,
        family_name: user.lastName,
        phone_number: user.phone,
        locale: user.locale,
        'custom:emailMarketingState': user.emailMarketingState,
        'custom:smsMarketingState': user.smsMarketingState,
      },
    });
  }

  changeCurrentUserPassword(oldPassword: string, newPassword: string) {
    return updatePassword({ oldPassword, newPassword });
  }

  async signOut() {
    return signOut();
  }
}
