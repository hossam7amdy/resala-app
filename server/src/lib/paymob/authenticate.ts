import { ENV } from '../../config';

const PAYMOB_API_URL = ENV.PAYMOB_API_URL;
const PAYMOB_API_TOKEN = ENV.PAYMOB_API_TOKEN;

export interface AuthenticateResponse {
  token: string;
}

/**
 * Authenticate with Paymob API and get the token to use in the next requests
 * @returns {Promise<AuthenticateResponse>}
 *
 * @see https://docs.paymob.com/docs/accept-standard-redirect#1-authentication-request
 */
export async function authenticate(): Promise<AuthenticateResponse> {
  const response = await fetch(`${PAYMOB_API_URL}/auth/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: PAYMOB_API_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<AuthenticateResponse>;
}
