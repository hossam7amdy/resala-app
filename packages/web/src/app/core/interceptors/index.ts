import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';

// import { HttpLoadingInterceptor } from './http-loading.interceptor';
// import { RouterLoaderInterceptor } from './router-loader.interceptor';

export const httpInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: RouterLoaderInterceptor, multi: true, },
  // { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
];
