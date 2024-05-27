import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  PatternValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  //show password
  showPW: any;
  togglePW() {
    this.showPW = !this.showPW;
  }

  errMsg: string = '';
  successMsg: string = '';
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

    // password:new FormControl('', [Validators.required,
    //   Validators.minLength(8),
    //   Validators.maxLength(8),
    //   Validators.pattern('[a-z]{1,}[A-Z]{1,}[0-9]{1,}[!@#$%^&*()>< +-=_?]{1,}'),

    // ]),

    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/\d/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[ !@#$%^&*()_=~.,+-:;'"\\|<>\/?]/),
        Validators.minLength(8),
      ])
    ),

    email: new FormControl('', [Validators.required, Validators.email]),
  });

  handleForm(registerForm: FormGroup): void {
    this.isLoading = true;

    const userData = this.registerForm.value;

    if (this.registerForm.valid === true) {
      console.log(userData);
      this._AuthService.register(userData).subscribe({
        next: response => {
          if (response.success == true) {
            this.successMsg = 'Registration successfuly';
            this.isLoading = false;
            this._Router.navigate(['/login']);
          }
        },
        error: err => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        },
      });
      //Email already registered
    }
  }

  textTimer(txt: string) {
    setTimeout(() => {
      txt;
    }, 3000);
  }
}

// success": true,
//     "message": "Registration successful",

// "success": false,
//     "message": "Email already registered"
// }
