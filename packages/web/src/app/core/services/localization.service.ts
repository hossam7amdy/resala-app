import { Injectable } from '@angular/core';
import { translations } from '@aws-amplify/ui-angular';
import { I18n } from 'aws-amplify/utils';
import { BehaviorSubject } from 'rxjs';
import { arDict } from 'src/i18n/ar.authenticator';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  constructor() {}

  rTLStatus: BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('language'));

  setupAuthenticatorLocalization() {
    const locale = this.rTLStatus.value || 'en';

    I18n.setLanguage(locale);
    I18n.putVocabularies(translations);

    I18n.putVocabulariesForLanguage('en', {
      'Create Account': 'Register',
      'Given Name': 'First Name',
      'Family Name': 'Last Name',
      'Enter your Phone Number': 'Enter your phone number',
    });

    I18n.putVocabulariesForLanguage('ar', arDict);
  }
}
