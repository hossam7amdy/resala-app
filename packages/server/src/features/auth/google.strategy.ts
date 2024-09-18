import { type ProviderUser } from '@resala/shared';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import type { AuthenticateOptionsGoogle, Profile, VerifyCallback } from 'passport-google-oauth20';

import { type Configuration } from '../../configuration/index.js';

export class GoogleStrategy {
  constructor(readonly config: Configuration['auth']['google']) {
    const { clientId, clientSecret, callbackURL } = config;
    if (!clientId || !clientSecret) {
      throw new Error('Google client ID and client secret are required');
    }

    const strategyConfig = {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      scope: ['profile', 'email'],
    };

    const strategy = new Strategy(strategyConfig, this.validate);

    this.initializeGoogleStrategy(strategy);
  }

  private initializeGoogleStrategy(strategy: Strategy) {
    passport.use(strategy);
  }

  private async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const user = {
      email: profile.emails?.at(0)?.value,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
    } as ProviderUser;

    done(null, user);
  }

  static authenticate(options: AuthenticateOptionsGoogle = {}) {
    return passport.authenticate('google', {
      session: false,
      ...options,
    });
  }
}
