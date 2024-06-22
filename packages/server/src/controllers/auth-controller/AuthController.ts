import { signJwt } from '../../lib/index.js';
import type { AuthService, NotificationService } from '../../services/index.js';
import { BadRequestError } from '../../utils/ApiErrors.js';
import type {
  ChangePassword,
  ForgotPassword,
  Login,
  Refresh,
  Register,
  ResendVerificationEmail,
  ResetPassword,
  VerifyEmail,
} from './IAuthController.js';
import type IAuthController from './IAuthController.js';

export default class AuthController implements IAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {}

  login: Login = async (req, res, next) => {
    try {
      const { sign, password } = req.body;
      const response = await this.authService.authenticate(sign, password);

      return res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  register: Register = async (req, res, next) => {
    try {
      // Register user
      const { user, verifyToken } = await this.authService.register(req.body);

      // Send verification email
      await this.notificationService.sendVerificationEmail(user.email, verifyToken);

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  refresh: Refresh = async (req, res, next) => {
    try {
      const { token } = req.body;
      const response = await this.authService.refreshToken(token);

      return res.json({
        success: true,
        data: {
          expiresAt: response.expiresAt,
          accessToken: response.accessToken,
          refreshToken: token,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  verifyEmail: VerifyEmail = async (req, res) => {
    try {
      await this.authService.verifyEmail(req.query.email, req.query.token);

      res.render('success', { message: 'Email verified successfully' });
    } catch (error) {
      const msg = (error as Error).message;
      res.render('error', { message: msg });
    }
  };

  forgotPassword: ForgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;

      const { resetCode, token, expiresAt } = await this.authService.forgotPassword(email);

      await this.notificationService.sendResetPasswordEmail(email, resetCode);

      return res.json({
        success: true,
        data: {
          expiresAt,
          resetToken: token,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  resetPassword: ResetPassword = async (req, res, next) => {
    try {
      const { email, code, password } = req.body;
      const resetToken = req.headers.authorization?.split(' ')[1];

      if (!resetToken) {
        return next(new BadRequestError('Invalid token'));
      }

      const rested = await this.authService.resetPassword(resetToken, code, password);
      await this.notificationService.sendResetConfirmationEmail(email);

      return res.json({
        success: rested,
      });
    } catch (error) {
      next(error);
    }
  };

  changePassword: ChangePassword = async (req, res, next) => {
    try {
      const email = res.locals.user.email;
      const { oldPassword, newPassword } = req.body;

      const changed = await this.authService.changePassword(email, oldPassword, newPassword);
      await this.notificationService.sendResetConfirmationEmail(email);

      return res.json({
        success: changed,
      });
    } catch (error) {
      next(error);
    }
  };

  resendVerificationEmail: ResendVerificationEmail = async (_, res, next) => {
    try {
      const { id, email } = res.locals.user;

      const verifyToken = signJwt({ id, email }, process.env.JWT_VERIFY!, { expiresIn: '30d' });
      await this.notificationService.sendVerificationEmail(email, verifyToken);

      return res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
