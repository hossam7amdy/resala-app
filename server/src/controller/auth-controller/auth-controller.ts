import { ENV } from '../../config';
import { signJwt } from '../../lib/jwt-token';
import { authService, communicationService } from '../../service';
import { BadRequestError } from '../../utils/api-errors';
import {
  ChangePassword,
  ForgotPassword,
  Login,
  Register,
  ResendVerificationEmail,
  ResetPassword,
  VerifyEmail,
} from './auth-controller.interface';

export const login: Login = async (req, res, next) => {
  try {
    const { sign, password } = req.body;
    const token = await authService.authenticate(sign, password);

    return res.json({
      success: true,
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

export const register: Register = async (req, res, next) => {
  try {
    // Register user
    const { user, verifyToken } = await authService.register(req.body);

    // Send verification email
    await communicationService.sendVerificationEmail(user.email, verifyToken);

    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail: VerifyEmail = async (req, res) => {
  try {
    await authService.verifyEmail(req.query.email, req.query.token);

    res.render('success', { message: 'Email verified successfully' });
  } catch (error) {
    const msg = (error as Error).message;
    res.render('error', { message: msg });
  }
};

export const resendVerificationEmail: ResendVerificationEmail = async (_, res, next) => {
  try {
    const { id, email } = res.locals.user;

    const verifyToken = signJwt({ id, email }, ENV.JWT_VERIFY!, { expiresIn: '30d' });
    await communicationService.sendVerificationEmail(email, verifyToken);

    return res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword: ChangePassword = async (req, res, next) => {
  try {
    const email = res.locals.user.email;
    const { oldPassword, newPassword } = req.body;

    const changed = await authService.changePassword(email, oldPassword, newPassword);
    await communicationService.sendResetConfirmationEmail(email);

    return res.json({
      success: changed,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword: ForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const { resetCode, token, expiresAt } = await authService.forgotPassword(email);

    await communicationService.sendResetPasswordEmail(email, resetCode);

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

export const resetPassword: ResetPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;
    const resetToken = req.headers.authorization?.split(' ')[1];

    if (!resetToken) {
      return next(new BadRequestError('Invalid token'));
    }

    const rested = await authService.resetPassword(resetToken, code, password);
    await communicationService.sendResetConfirmationEmail(email);

    return res.json({
      success: rested,
    });
  } catch (error) {
    next(error);
  }
};
