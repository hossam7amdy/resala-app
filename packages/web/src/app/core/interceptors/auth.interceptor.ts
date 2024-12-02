import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  excludedExtensionsUrls = ['.svg', '.json', '/api/v0.1/countries', '/api/v0.1/countries/cities'];
  constructor() {}

  checkExExtensionsUrls(url: string): boolean {
    const listCheck: boolean[] = [];
    this.excludedExtensionsUrls.forEach(excludedUrl => listCheck.push(url.endsWith(excludedUrl)));
    return listCheck.includes(true);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.checkExExtensionsUrls(request.url)) {
      return next.handle(request);
    }

    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request);
  }
}
