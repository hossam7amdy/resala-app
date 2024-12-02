import { TestBed } from '@angular/core/testing';

import { Translate_Service } from './translate.service';

describe('Translate_Service', () => {
  let service: Translate_Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Translate_Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
