import type { ResourcesConfig } from 'aws-amplify';

import { configuration } from '.';

export const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    //  Amazon Cognito User Pool ID
    userPoolId: configuration.cognito.userPoolId,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolClientId: configuration.cognito.userPoolClientId,
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: configuration.cognito.identityPoolId,
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
        domain: configuration.cognito.oauthDomain,
        redirectSignIn: [configuration.cognito.oauthRedirectSignIn],
        redirectSignOut: [configuration.cognito.oauthRedirectSignOut],
        scopes: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        responseType: 'code',
      },
    },
  },
};
