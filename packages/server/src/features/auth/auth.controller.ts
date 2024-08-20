import {
  type ChangePasswordRequest,
  type ChangePasswordResponse,
  ChangePasswordSchema,
  type ForgotPasswordRequest,
  type ForgotPasswordResponse,
  ForgotPasswordSchema,
  LoginRequest,
  type LoginResponse,
  LoginSchema,
  RefreshTokenRequest,
  type RefreshTokenResponse,
  RefreshTokenSchema,
  RegisterRequest,
  type RegisterResponse,
  RegisterSchema,
  type ResendVerificationEmailResponse,
  ResetPasswordRequest,
  type ResetPasswordResponse,
  ResetPasswordSchema,
  VerifyEmailRequest,
  type VerifyEmailResponse,
  VerifyEmailSchema,
} from '@resala/shared';
import type { Request as ExRequest } from 'express';
import jwt from 'jsonwebtoken';
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Path,
  Post,
  Queries,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { BadRequestError } from '../../errors/api.errors.js';
import { validateMiddleware } from '../../middlewares/index.js';
import { EmailNotification } from '../notification/email.notification.js';
import { NotificationService } from '../notification/notification.service.js';
import { AuthService } from './auth.service.js';

@Tags('Auth')
@Route('api/v1/auth')
export class AuthController extends Controller {
  private readonly authService: AuthService;
  private readonly notificationService: NotificationService;
  constructor() {
    super();

    this.authService = new AuthService(db);
    this.notificationService = new NotificationService(new EmailNotification());
  }

  @Post('login')
  @Middlewares([validateMiddleware(LoginSchema)])
  public async login(@Body() body: LoginRequest['body']): Promise<LoginResponse> {
    const { sign, password } = body;
    const response = await this.authService.authenticate(sign, password);

    return { success: true, data: response };
  }

  @Post('register')
  @Middlewares([validateMiddleware(RegisterSchema)])
  @SuccessResponse('201', 'User registered successfully')
  public async register(@Body() body: RegisterRequest['body']): Promise<RegisterResponse> {
    // Register user
    const { user, verifyToken } = await this.authService.register(body);

    // Send verification email
    await this.notificationService.sendVerificationEmail(user.email, verifyToken);

    return { success: true };
  }

  @Post('refresh')
  @Middlewares([validateMiddleware(RefreshTokenSchema)])
  public async refresh(@Body() body: RefreshTokenRequest['body']): Promise<RefreshTokenResponse> {
    const { token } = body;
    const response = await this.authService.refreshToken(token);

    return {
      success: true,
      data: {
        expiresAt: response.expiresAt,
        accessToken: response.accessToken,
        refreshToken: token,
      },
    };
  }

  @Get('verify-email')
  @Middlewares([validateMiddleware(VerifyEmailSchema)])
  public async verifyEmail(
    @Queries() query: VerifyEmailRequest['query']
  ): Promise<VerifyEmailResponse> {
    await this.authService.verifyEmail(query.email, query.token);

    return { success: true, message: 'Email verified successfully' };
  }

  @Post('forgot-password')
  @Middlewares([validateMiddleware(ForgotPasswordSchema)])
  @SuccessResponse('200', 'Password reset code sent successfully')
  public async forgotPassword(
    @Body() body: ForgotPasswordRequest['body']
  ): Promise<ForgotPasswordResponse> {
    const { email } = body;

    const { resetCode, token, expiresAt } = await this.authService.forgotPassword(email);

    await this.notificationService.sendResetPasswordEmail(email, resetCode);

    return {
      success: true,
      data: { expiresAt, resetToken: token },
    };
  }

  @Post('reset-password')
  @Security('jwt_auth', ['reset_password'])
  @Middlewares([validateMiddleware(ResetPasswordSchema)])
  public async resetPassword(
    @Body() body: ResetPasswordRequest['body'],
    @Request() req: ExRequest
  ): Promise<ResetPasswordResponse> {
    const { email, code, password } = body;
    const resetToken = req.headers.authorization?.split(' ')[1];

    if (!resetToken) {
      throw new BadRequestError('Reset token is required');
    }

    await this.authService.resetPassword(resetToken, code, password);
    await this.notificationService.sendResetConfirmationEmail(email);

    return { success: true };
  }

  @Path('change-password')
  @Security('jwt_auth')
  @Middlewares([validateMiddleware(ChangePasswordSchema)])
  public async changePassword(
    @Body() body: ChangePasswordRequest['body'],
    @Request() req: ExRequest
  ): Promise<ChangePasswordResponse> {
    const email = req.res?.locals.user.email;
    const { oldPassword, newPassword } = body;

    await this.authService.changePassword(email, oldPassword, newPassword);
    await this.notificationService.sendResetConfirmationEmail(email);

    return { success: true };
  }

  @Get('resend-email-verification') // TODO: convert to POST
  @Security('jwt_auth')
  public async resendVerificationEmail(
    @Request() req: ExRequest
  ): Promise<ResendVerificationEmailResponse> {
    const { id, email } = req.res?.locals.user;

    const verifyToken = jwt.sign({ id, email }, process.env.JWT_VERIFY!, { expiresIn: '30d' });
    await this.notificationService.sendVerificationEmail(email, verifyToken);

    return { success: true };
  }
}
