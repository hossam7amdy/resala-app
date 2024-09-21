import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackSocialAccountsComponent } from './callback-social-accounts.component';

describe('CallbackSocialAccountsComponent', () => {
  let component: CallbackSocialAccountsComponent;
  let fixture: ComponentFixture<CallbackSocialAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CallbackSocialAccountsComponent]
    });
    fixture = TestBed.createComponent(CallbackSocialAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
