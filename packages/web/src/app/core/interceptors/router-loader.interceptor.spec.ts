import { TestBed } from '@angular/core/testing';

import { RouterLoaderInterceptor } from './router-loader.interceptor';

describe('RouterLoaderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RouterLoaderInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: RouterLoaderInterceptor = TestBed.inject(RouterLoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
