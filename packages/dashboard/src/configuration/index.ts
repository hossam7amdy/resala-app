import { z } from 'zod';

const configuration = {
  baseUrl: z
    .string()
    .default('http://localhost:5000')
    .parse(process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL),
  cognito: {
    userPoolId: z.string().parse(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID),
    userPoolClientId: z.string().parse(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID),
    identityPoolId: z.string().parse(process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID),
    oauthDomain: z.string().parse(process.env.NEXT_PUBLIC_COGNITO_OAUTH_DOMAIN),
    oauthRedirectSignIn: 'http://localhost:3000',
    oauthRedirectSignOut: 'http://localhost:3000/login',
  },
};

export type Configuration = typeof configuration;
export { configuration };
