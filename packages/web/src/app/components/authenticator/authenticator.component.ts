import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import type { StopListenerCallback } from '@aws-amplify/core/dist/esm/Hub/types';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { TranslateModule } from '@ngx-translate/core';
import type { SignUpInput } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  standalone: true,
  imports: [AmplifyAuthenticatorModule, SpinnerComponent, TranslateModule, RouterLink],
})
export class AuthenticatorComponent implements OnInit, OnDestroy {
  public stopListenerCallback: StopListenerCallback;

  constructor(
    public authenticator: AuthenticatorService,
    private cognitoService: CognitoService,
    private router: Router,
    private translateService: LocalizationService
  ) {
    this.stopListenerCallback = Hub.listen('auth', this.handleAuthEvent.bind(this));
  }

  private handleAuthEvent({ payload }: { payload: any }): void {
    if (payload.event === 'signInWithRedirect' || payload.event === 'signedIn') {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.translateService.setupAuthenticatorLocalization();
  }

  ngOnDestroy(): void {
    this.stopListenerCallback();
  }

  public formFields = {
    signUp: {
      given_name: {
        order: 1,
      },
      family_name: {
        order: 2,
      },
      email: {
        order: 3,
      },
      phone_number: {
        dialCode: '+20',
        dialCodeList: ['+20'],
        order: 4,
        isRequired: false,
      },
      password: {
        order: 5,
      },
      confirm_password: {
        order: 6,
      },
    },
  };

  services = {
    handleSignUp: async (input: SignUpInput) => {
      const response = await this.cognitoService.signUp(input);
      if (response.isSignUpComplete) {
        this.router.navigate(['/home']);
      }

      return response;
    },
  };
}
