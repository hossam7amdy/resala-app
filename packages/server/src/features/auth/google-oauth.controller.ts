import { GoogleLoginSchema, type ProviderUser } from '@resala/shared';
import { type Request as ExRequest } from 'express';
import {
  Controller,
  Get,
  Hidden,
  Middlewares,
  Query,
  Request,
  Route,
  Tags,
} from 'tsoa/dist/index.js';

import { configuration } from '../../configuration/index.js';
import { db } from '../../datastore/index.js';
import { BadRequestError } from '../../errors/api.errors.js';
import { validate } from '../../middlewares/index.js';
import { isAllowedOrigin } from '../../utils/is-allowed-origin.js';
import { AuthService, GoogleStrategy } from './index.js';

@Tags('Auth')
@Route('auth/google')
export class GoogleOAuthController extends Controller {
  readonly redirectUrl = configuration.origin.web + '/login/callback';

  private readonly authService: AuthService;

  constructor() {
    super();

    new GoogleStrategy(configuration.auth.google);
    this.authService = new AuthService(configuration, db);
  }

  /**
   * This endpoint redirects the user to Google's and initiates the Google OAuth2 login flow.
   *
   * - The `redirectUrl` query parameter should be passed in the request, the `redirectUrl` should be a URL encoded.
   * - The frontend should implement a route that listens to the `redirectUrl` and extracts the `accessToken` and `refreshToken` from the query parameters.
   *
   * **Example:**
   *
   * 1. _Request_ - Redirect the user to Google's login page:
   * ```ts
   * const redirectUrl = encodeURIComponent('http://localhost:3000/login/callback');
   * window.location.href = `http://localhost:3000/auth/google?redirectUrl=${redirectUrl}`;
   * ```
   * 2. _Response_ - Google redirects the user to the `redirectUrl` with the tokens as query parameters:
   * ```ts
   * // http://localhost:3000/login/callback?accessToken=...&refreshToken=...
   * ```
   *
   *
   * @param {string} [redirectUrl] - The URL to redirect the user to after the login is successful.
   */
  @Get('/')
  @Middlewares([validate(GoogleLoginSchema)])
  public googleAuth(@Request() req: ExRequest, @Query() redirectUrl?: string): void {
    redirectUrl ??= encodeURIComponent(this.redirectUrl);

    if (!isAllowedOrigin(redirectUrl)) {
      throw new BadRequestError('Invalid redirect URL');
    }

    GoogleStrategy.authenticate({ state: redirectUrl })(req, req.res, req.next);
  }

  @Hidden()
  @Get('/callback')
  @Middlewares(GoogleStrategy.authenticate())
  public async googleCallback(@Request() req: ExRequest) {
    const redirectUrl = decodeURIComponent(req.query.state as string);
    const userProfile = req.user as ProviderUser;

    const { accessToken, refreshToken } = await this.authService.loginWithProvider(userProfile);

    return req.res?.redirect(
      `${redirectUrl}?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  }
}
