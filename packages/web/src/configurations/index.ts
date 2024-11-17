import type { AuthConfig } from '@aws-amplify/core';
import { environment } from 'src/environments/environment.development';

export const config = {
  amplifyAuth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: environment.userPoolId,
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: environment.userPoolClientId,
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: environment.identityPoolId,
      // OPTIONAL - Set to true to use your identity pool's unauthenticated role when user is not logged in
      allowGuestAccess: true,
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: 'code', // 'code' | 'link',
      mfa: {
        status: 'optional',
        totpEnabled: true,
        smsEnabled: false,
      },
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: environment.oauthDomain,
          redirectSignIn: [environment.oauthRedirectSignIn],
          redirectSignOut: [environment.oauthRedirectSignOut],
          scopes: ['email', 'profile', 'openid'],
          responseType: 'code',
        },
      },
    },
  } satisfies AuthConfig,
};

export default config;
