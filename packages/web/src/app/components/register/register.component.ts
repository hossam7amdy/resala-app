import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    public _Translate: TranslateService
  ) {}

  isCheckedTerms: boolean = false;
  checkedTerms(): void {
    if (this.isCheckedTerms == false) {
      this.isCheckedTerms = true;
    } else {
      this.isCheckedTerms = false;
    }
  }
  //show password
  showPW: any;
  togglePW() {
    this.showPW = !this.showPW;
  }

  errMsg: string = '';
  errMsgAr: string = '';
  successMsg: string = '';
  successMsgAr: string = '';
  isLoading: boolean = false;

  // can use FormBulder instead of  new FormGroup (lookup leson 9)

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('.*\\S.*[a-zA-Z0-9 ]'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('.*\\S.*[a-zA-Z0-9 ]'),
    ]),
    name: new FormControl('', [
      Validators?.minLength(2),
      Validators?.maxLength(100),
      Validators?.pattern('.*\\S.*[a-zA-Z0-9 ]'),
    ]),
    birthDate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
    ]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/\d/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[ !@#$%^&*()_=~.,+-:;'"\\|<>/?]/),
        Validators.minLength(8),
      ])
    ),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  handleForm(_registerForm: FormGroup): void {
    const userName = this.registerForm.value;
    this.registerForm.patchValue({ name: `${userName.firstName}` + `${userName.lastName}` });

    if (this.isCheckedTerms) {
      const userData = this.registerForm.value;
      if (this.registerForm.valid === true) {
        this.isLoading = true;
        this._AuthService.register(userData).subscribe({
          next: () => {
            this.successMsg = 'Registration successfuly';
            this.successMsgAr = 'تم تسجيل الحساب بنجاح';
            this.isLoading = false;
            this._Router.navigate(['/login']);
          },
          error: err => {
            this.errMsg = err?.error?.message;
            this.isLoading = false;
          },
        });
      } else {
        this.errMsg = 'Please fill in the required fields.';
        this.errMsgAr = 'برجاء ملئ الحقول المطلوبة';
      }
    } else {
      this.errMsg = 'Please check Privacy Policy';
      this.errMsgAr = 'برجاء مراجعة سياسة الخصوصية';
    }
  }
}
