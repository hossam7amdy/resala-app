import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { AuthService } from '@core/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {} // private authService: AuthService

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          // this.authService.logout();
          console.log('NOT Authorized');
          alert('NOT Authorized');
        }
        return throwError(() => err);
      })
    );
  }
}
