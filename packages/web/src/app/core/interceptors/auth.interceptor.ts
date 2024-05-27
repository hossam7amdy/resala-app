import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment as env } from 'environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  excludedExtensionsUrls = ['.svg', '.json'];
  constructor() { }

  checkExExtensionsUrls(url: string): boolean {
    const listCheck: boolean[] = [];
    this.excludedExtensionsUrls.forEach((excludedUrl) => listCheck.push(url.endsWith(excludedUrl)));
    return listCheck.includes(true);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.checkExExtensionsUrls(request.url)) {
      return next.handle(request);
    }

    // request = request.clone({
    //   url: `${env.baseApi}${request.url}`,
    // });

    // Set Request Headers
    const token = localStorage.getItem('etoken');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(request);
  }
}
