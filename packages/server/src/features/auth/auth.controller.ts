import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailResponse,
} from '@resala/shared';
import {
  ChangePasswordSchema,
  ForgotPasswordSchema,
  LoginSchema,
  RefreshTokenSchema,
  RegisterSchema,
  ResendVerificationSchema,
  ResetPasswordSchema,
  VerifyEmailSchema,
} from '@resala/shared';
import type { Request as ExRequest } from 'express';
import {
  Body,
  Controller,
  Middlewares,
  Patch,
  Post,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { configuration } from '../../configuration/index.js';
import { db } from '../../datastore/index.js';
import { BadRequestError } from '../../errors/api.errors.js';
import { jwtParse } from '../../middlewares/authentication.js';
import { limiter, validate } from '../../middlewares/index.js';
import { isAllowedOrigin } from '../../utils/is-allowed-origin.js';
import { EmailNotification } from '../notification/email.notification.js';
import { NotificationService } from '../notification/notification.service.js';
import { AuthService } from './index.js';

@Tags('Auth')
@Route('api/v1/auth')
@Middlewares([jwtParse, limiter()])
export class AuthController extends Controller {
  private readonly resetUrl = configuration.origin.web + '/reset-password';
  private readonly confirmUrl = configuration.origin.web + '/confirm-email';

  private readonly authService: AuthService;
  private readonly notificationService: NotificationService;

  constructor() {
    super();

    this.authService = new AuthService(configuration, db);
    this.notificationService = new NotificationService(new EmailNotification());
  }

  private async _sendVerificationEmail(email: string, token: string) {
    const link = `${this.confirmUrl}?token=${token}`;

    return await this.notificationService.sendVerificationEmail(email, link);
  }

  @Post('login')
  @Middlewares([validate(LoginSchema)])
  public async login(@Body() body: LoginRequest['body']): Promise<LoginResponse> {
    const { sign, password } = body;
    const response = await this.authService.login(sign, password);

    return { success: true, data: response };
  }

  /**
   * Register a new user. Sends a verification email to the user's email.
   * Frontend should implement a `/confirm-email` route that takes the token as a query parameter.
   * This route should call the `verifyEmail` endpoint with `Authorization` header set to the token.
   */
  @Post('register')
  @Middlewares([validate(RegisterSchema)])
  @SuccessResponse('201', 'User registered successfully')
  public async register(@Body() body: RegisterRequest['body']): Promise<RegisterResponse> {
    // Register user
    const { user, verifyToken } = await this.authService.register(body);

    // Send verification email
    await this._sendVerificationEmail(user.email, verifyToken);

    return { success: true };
  }

  @Post('refresh')
  @Middlewares([validate(RefreshTokenSchema)])
  public async refresh(@Body() body: RefreshTokenRequest['body']): Promise<RefreshTokenResponse> {
    const { token } = body;
    const { accessToken } = await this.authService.refreshToken(token);

    return {
      success: true,
      data: {
        accessToken,
        refreshToken: token,
      },
    };
  }

  /**
   * Verify the user's email using the token sent to their email. This endpoint should be called from the frontend after the user clicks the verification link.
   * The token should be passed in the header as `Bearer` token.
   */
  @Post('verify-email')
  @Security('JWT_VERIFY')
  @Middlewares([validate(VerifyEmailSchema)])
  public async verifyEmail(@Request() req: ExRequest): Promise<VerifyEmailResponse> {
    const email = req.res?.locals.user.email;

    await this.authService.verifyEmail(email);

    return { success: true, message: 'Email verified successfully' };
  }

  /**
   * Send a password reset link to the user's email, containing a reset token.
   * Frontend should implement a `/reset-password` route that takes the token as a query parameter, and a form to reset the password
   * calling the `resetPassword` endpoint.
   */
  @Post('forgot-password')
  @Middlewares([validate(ForgotPasswordSchema)])
  @SuccessResponse('200', 'Password reset code sent successfully')
  public async forgotPassword(
    @Body() body: ForgotPasswordRequest['body']
  ): Promise<ForgotPasswordResponse> {
    const { email, redirectUrl } = body;
    const resetUrl = redirectUrl ?? this.resetUrl;

    if (!isAllowedOrigin(resetUrl)) {
      throw new BadRequestError('Invalid redirect URL');
    }

    const { token } = await this.authService.forgotPassword(email);

    const link = `${resetUrl}?token=${token}`;

    await this.notificationService.sendResetPasswordEmail(email, link);

    return { success: true, message: 'Password reset link sent successfully' };
  }

  /**
   * Reset the user's password using the token sent to their email. This endpoint should be called from the frontend after the user clicks the reset link.
   * The token should be passed in the header as `Bearer` token.
   * The new password should be passed in the body.
   * After resetting the password, send a confirmation email to the user's email.
   */
  @Post('reset-password')
  @Security('JWT_RESET')
  @Middlewares([validate(ResetPasswordSchema)])
  public async resetPassword(
    @Body() body: ResetPasswordRequest['body'],
    @Request() req: ExRequest
  ): Promise<ResetPasswordResponse> {
    const email = req.res?.locals.user.email;
    const { newPassword, confirmNewPassword } = body;

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestError('The two passwords that you provided do not match!');
    }

    await this.authService.resetPassword(email, newPassword);
    await this.notificationService.sendResetConfirmationEmail(email);

    return { success: true };
  }

  @Patch('change-password')
  @Security('JWT_SECRET')
  @Middlewares([validate(ChangePasswordSchema)])
  public async changePassword(
    @Body() body: ChangePasswordRequest['body'],
    @Request() req: ExRequest
  ): Promise<ChangePasswordResponse> {
    const email = req.res?.locals.user.email;
    const { oldPassword, newPassword } = body;

    await this.authService.changePassword(email, oldPassword, newPassword);

    return { success: true };
  }

  /**
   * Resend the email verification link to the user's email. This is useful if the user didn't receive the email the first time.
   * Frontend should implement a `/confirm-email` route that takes the token as a query parameter. This route should call the `verifyEmail` endpoint.
   */
  @Post('resend-email-verification')
  @Security('JWT_SECRET')
  @Middlewares([validate(ResendVerificationSchema)])
  public async resendVerificationEmail(
    @Body() body: ResendVerificationEmailRequest['body']
  ): Promise<ResendVerificationEmailResponse> {
    const { email } = body;

    const { token } = await this.authService.requestEmailVerification(email);

    await this._sendVerificationEmail(email, token);

    return { success: true, message: 'Verification email sent successfully' };
  }
}
