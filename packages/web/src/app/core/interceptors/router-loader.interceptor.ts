import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Router } from '@angular/router';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import type { NgxSpinnerService } from 'ngx-spinner';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RouterLoaderInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.router.events.pipe(map(evt => evt)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show('httpSpinner');
      }

      if (event instanceof NavigationError) {
        this.spinnerService.hide('httpSpinner');
      }
      if (event instanceof NavigationCancel) {
        this.spinnerService.hide('httpSpinner');
      }

      if (event instanceof NavigationEnd) {
        this.spinnerService.hide('httpSpinner');
      }
    });
    return next.handle(req);
  }
}
