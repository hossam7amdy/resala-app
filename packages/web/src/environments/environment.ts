// https://v16.angular.io/guide/build
export const environment = {
  production: true,
  baseUrl: import.meta.env.NG_APP_BASE_URL,

  userPoolId: import.meta.env.NG_APP_COGNITO_USER_POOL_ID,
  userPoolClientId: import.meta.env.NG_APP_COGNITO_USER_POOL_CLIENT_ID,
  identityPoolId: import.meta.env.NG_APP_COGNITO_IDENTITY_POOL_ID,
  oauthDomain: import.meta.env.NG_APP_COGNITO_OAUTH_DOMAIN,
  oauthRedirectSignIn: 'http://www.resala.live/login',
  oauthRedirectSignOut: 'http://www.resala.live/home',
};
