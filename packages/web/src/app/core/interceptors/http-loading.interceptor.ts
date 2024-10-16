import type { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: NgxSpinnerService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.spinnerService.show('httpSpinner');

    return next.handle(request).pipe(
      delay(100),
      finalize(() => this.spinnerService.hide('httpSpinner'))
    );
  }
}
