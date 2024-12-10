import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ENDPOINT_CONFIGS,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GetSessionResponse,
  LoginAnonymousResponse,
  LoginRequest,
  LoginResponse,
  LoginWithPhoneRequest,
  LogoutResponse,
  ProviderLoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  User,
} from '@resala/shared';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

type SignData = {
  sign: string;
  password: string;
  rememberMe?: boolean;
};
type RegisterData = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = new BehaviorSubject<boolean>(false);
  public authenticated$ = this.authenticated.asObservable();

  private userInfoSubject = new BehaviorSubject<User | null>(null);
  public userInfo$ = this.userInfoSubject.asObservable();

  constructor(private _httpClient: HttpClient) {}

  private _setUserInfo(userInfo: User): void {
    this.userInfoSubject.next(userInfo);
    this.authenticated.next(true);
  }

  private _clearUserInfo(): void {
    this.userInfoSubject.next(null);
    this.authenticated.next(false);
  }

  register(userData: RegisterData): Observable<RegisterResponse> {
    const body: RegisterRequest = {
      ...userData,
      name: `${userData.firstName} ${userData.lastName}`,
      callbackURL: `${location.origin}/login`,
    };

    const { url } = ENDPOINT_CONFIGS.register;
    return this._httpClient.post<RegisterResponse>(`${environment.baseUrl}${url}`, body);
  }

  loginWithEmail({ sign, password, rememberMe }: SignData): Observable<LoginResponse> {
    const body: LoginRequest = {
      email: sign,
      password,
      rememberMe,
      callbackURL: `${location.origin}/home`,
    };

    const { url } = ENDPOINT_CONFIGS.login;
    return this._httpClient.post<LoginResponse>(`${environment.baseUrl}${url}`, body);
  }

  loginWithPhone({ sign, password, rememberMe }: SignData): Observable<LoginResponse> {
    const body: LoginWithPhoneRequest = {
      phoneNumber: sign,
      password,
      rememberMe,
      callbackURL: `${location.origin}/home`,
    };

    const { url } = ENDPOINT_CONFIGS.loginWithPhone;
    return this._httpClient.post<LoginResponse>(`${environment.baseUrl}${url}`, body);
  }

  login(signData: SignData): Observable<LoginResponse> {
    const loginObservable = signData.sign.includes('@')
      ? this.loginWithEmail(signData)
      : this.loginWithPhone(signData);

    return loginObservable.pipe(tap(res => this._setUserInfo(res.user)));
  }

  loginAnonymous(): Observable<LoginAnonymousResponse> {
    const { url } = ENDPOINT_CONFIGS.loginAnonymous;
    return this._httpClient.post<LoginAnonymousResponse>(`${environment.baseUrl}${url}`, {});
  }

  loginWithGoogle(): Observable<ProviderLoginResponse> {
    const body = {
      provider: 'google',
      callbackURL: `${location.origin}/home`,
      errorCallbackURL: location.href,
    };

    const { url } = ENDPOINT_CONFIGS.loginWithProvider;
    return this._httpClient.post<ProviderLoginResponse>(`${environment.baseUrl}${url}`, body);
  }

  logout(): Observable<LogoutResponse> {
    const { url } = ENDPOINT_CONFIGS.logout;
    const logoutObservable = this._httpClient.post<LogoutResponse>(
      `${environment.baseUrl}${url}`,
      {}
    );

    return logoutObservable.pipe(
      tap(() => {
        this._clearUserInfo();
        this.loginAnonymous().subscribe();
      })
    );
  }

  getSession(): Observable<GetSessionResponse> {
    const { url } = ENDPOINT_CONFIGS.getSession;
    const sessionObservable = this._httpClient.get<GetSessionResponse>(
      `${environment.baseUrl}${url}`
    );

    return sessionObservable.pipe(
      tap(session => {
        if (!session) {
          this.loginAnonymous().subscribe();
        } else if (!session.user.isAnonymous) {
          this._setUserInfo(session.user);
        }
      })
    );
  }

  forgetPassword({ email }: { email: string }): Observable<ForgotPasswordResponse> {
    const body: ForgotPasswordRequest = {
      email,
      redirectTo: `${location.origin}/reset-password`,
    };

    const { url } = ENDPOINT_CONFIGS.forgetPassword;
    return this._httpClient.post<ForgotPasswordResponse>(`${environment.baseUrl}${url}`, body);
  }

  resetPassword(
    payload: { newPassword: string },
    token: string
  ): Observable<ResetPasswordResponse> {
    const body: ResetPasswordRequest = {
      newPassword: payload.newPassword,
      token,
    };

    const { url } = ENDPOINT_CONFIGS.resetPassword;
    return this._httpClient.post<ResetPasswordResponse>(`${environment.baseUrl}${url}`, body);
  }
}
