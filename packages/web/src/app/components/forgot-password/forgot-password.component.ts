import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private toaster: ToastrService
  ) {}

  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner

  isLoading: boolean = false;
  successMsg: string = '';
  errMsg: string = '';
  isEmail: boolean = true;
  isPhone: boolean = false;

  forgotPw: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  spinnerLoadEmail(): void {
    this.customSpinIsLoading = true;
    this.isEmail = true;
    this.isPhone = false;
    this.customSpinIsLoading = false;
  }

  spinnerLoadPhone(): void {
    this.customSpinIsLoading = true;

    this.isPhone = true;
    this.isEmail = false;

    this.customSpinIsLoading = false;
  }

  sendEmail(): void {
    this.customSpinIsLoading = true;
    this._AuthService.forgotPassword(this.forgotPw.value).subscribe({
      next: response => {
        console.log('response', response);
        this.customSpinIsLoading = false;
      },
      error: err => {
        console.log('error', err);
        this.customSpinIsLoading = false;
      },
    });
  }
}
