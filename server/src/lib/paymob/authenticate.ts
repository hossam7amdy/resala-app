import { ENV } from '../../config';
import { fetch } from '../../utils/fetch';

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
  try {
    const response = await fetch.post(`${PAYMOB_API_URL}/auth/tokens`, {
      api_key: PAYMOB_API_TOKEN,
    });

    return response as AuthenticateResponse;
  } catch (error) {
    throw new Error('Failed to authenticate with Paymob API');
  }
}
