import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CognitoService } from '../services/cognito.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  excludedExtensionsUrls = ['.svg', '.json'];
  constructor(private cognitoService: CognitoService) {}

  checkExExtensionsUrls(url: string): boolean {
    const listCheck: boolean[] = [];
    this.excludedExtensionsUrls.forEach(excludedUrl => listCheck.push(url.endsWith(excludedUrl)));
    return listCheck.includes(true);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.checkExExtensionsUrls(req.url)) {
      return next.handle(req);
    }

    return new Observable(observer => {
      this.cognitoService
        .fetchAccessToken()
        .then(token => {
          const authReq = token
            ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
            : req;
          next.handle(authReq).subscribe(
            event => observer.next(event),
            err => observer.error(err),
            () => observer.complete()
          );
        })
        .catch(() => {
          next.handle(req).subscribe(
            event => observer.next(event),
            err => observer.error(err),
            () => observer.complete()
          );
        });
    });
  }
}
